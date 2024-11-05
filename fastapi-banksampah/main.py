from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List
from datetime import date
from passlib.context import CryptContext
from sqlalchemy import Column, Integer, String, Boolean

from database import SessionLocal, engine
from models import Base, BankSampahReport, BankSampahRegistration

app = FastAPI()

# Create the database tables if they do not exist
Base.metadata.create_all(bind=engine)

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Schemas for request and response
class BankSampahReportRequest(BaseModel):
    desa_kelurahan: str
    nama_bank_sampah: str
    rt: str = None
    rw: str = None
    jumlah_nasabah: int
    nasabah_aktif: int
    pembelian_kg: float
    jumlah_pembelian_rp: float
    penjualan_kg: float
    jumlah_penjualan_rp: float
    nama_pengepul: str = None
    tanggal: date

class BankSampahRegistrationRequest(BaseModel):
    desa_kelurahan: str
    nama_bank_sampah: str
    rt: str = None
    rw: str = None
    tanggal_pendaftaran: date
    nama_pengepul: str

# New schema for AdminUser registration and login
class AdminUserRegisterRequest(BaseModel):
    username: str
    password: str

class AdminUserLoginRequest(BaseModel):
    username: str
    password: str

# Model for admin users
class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)

# Helper function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Helper function to verify passwords
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# Endpoint to register a new admin user
@app.post("/admin/register/")
def register_admin_user(user: AdminUserRegisterRequest, db: Session = Depends(get_db)):
    # Check if username is already taken
    existing_user = db.query(AdminUser).filter(
        AdminUser.username == user.username).first()
    if existing_user:
        raise HTTPException(
            status_code=400, detail="Username is already taken.")

    # Hash the password
    hashed_password = hash_password(user.password)

    # Create a new admin user
    new_admin = AdminUser(username=user.username,
                          password_hash=hashed_password)
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    return {"message": "Admin user registered successfully"}

# Endpoint to login an admin user
@app.post("/admin/login/")
def login_admin_user(user: AdminUserLoginRequest, db: Session = Depends(get_db)):
    # Find the user in the database
    db_user = db.query(AdminUser).filter(
        AdminUser.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(
            status_code=400, detail="Invalid username or password")

    return {"message": "Login successful", "username": db_user.username}

# Endpoint to add a bank sampah report
@app.post("/bank_sampah_report/", response_model=BankSampahReportRequest)
def create_bank_sampah_report(report: BankSampahReportRequest, db: Session = Depends(get_db)):
    try:
        new_report = BankSampahReport(**report.dict())
        db.add(new_report)
        db.commit()
        db.refresh(new_report)
        return new_report
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error saving report data: {e}")

# Endpoint to add a bank sampah registration
@app.post("/bank_sampah_registration/", response_model=BankSampahRegistrationRequest)
def create_bank_sampah_registration(registration: BankSampahRegistrationRequest, db: Session = Depends(get_db)):
    try:
        new_registration = BankSampahRegistration(**registration.dict())
        db.add(new_registration)
        db.commit()
        db.refresh(new_registration)
        return new_registration
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500, detail=f"Error saving registration data: {e}")

# Endpoint to retrieve all bank sampah reports
@app.get("/bank_sampah_report/", response_model=List[BankSampahReportRequest])
def get_all_reports(db: Session = Depends(get_db)):
    try:
        reports = db.query(BankSampahReport).all()
        return reports
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving reports: {e}")

# Endpoint to retrieve all bank sampah registrations
@app.get("/bank_sampah_registration/", response_model=List[BankSampahRegistrationRequest])
def get_all_registrations(db: Session = Depends(get_db)):
    try:
        registrations = db.query(BankSampahRegistration).all()
        return registrations
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error retrieving registrations: {e}")

# Endpoint to retrieve a single bank sampah report by ID
@app.get("/bank_sampah_report/{report_id}", response_model=BankSampahReportRequest)
def get_report_by_id(report_id: int, db: Session = Depends(get_db)):
    report = db.query(BankSampahReport).filter(
        BankSampahReport.id == report_id).first()
    if not report:
        raise HTTPException(
            status_code=404, detail="Bank Sampah Report not found")
    return report

# Endpoint to retrieve a single bank sampah registration by ID
@app.get("/bank_sampah_registration/{registration_id}", response_model=BankSampahRegistrationRequest)
def get_registration_by_id(registration_id: int, db: Session = Depends(get_db)):
    registration = db.query(BankSampahRegistration).filter(
        BankSampahRegistration.id == registration_id).first()
    if not registration:
        raise HTTPException(
            status_code=404, detail="Bank Sampah Registration not found")
    return registration

# Endpoint to update a bank sampah registration by ID
@app.put("/bank_sampah_registration/{id}", response_model=BankSampahRegistrationRequest)
def update_registration(id: int, updated_data: BankSampahRegistrationRequest, db: Session = Depends(get_db)):
    db_data = db.query(BankSampahRegistration).filter(BankSampahRegistration.id == id).first()
    if not db_data:
        raise HTTPException(status_code=404, detail="Bank Sampah Registration not found")
    
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(db_data, key, value)
    
    db.commit()
    db.refresh(db_data)
    return db_data

# Endpoint to update a bank sampah report by ID
@app.put("/bank_sampah_report/{id}", response_model=BankSampahReportRequest)
def update_report(id: int, updated_data: BankSampahReportRequest, db: Session = Depends(get_db)):
    db_report = db.query(BankSampahReport).filter(BankSampahReport.id == id).first()
    if not db_report:
        raise HTTPException(status_code=404, detail="Bank Sampah Report not found")
    
    for key, value in updated_data.dict(exclude_unset=True).items():
        setattr(db_report, key, value)
    
    db.commit()
    db.refresh(db_report)
    return db_report