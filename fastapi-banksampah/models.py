from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Date
from database import Base

class BankSampahReport(Base):
    __tablename__ = "bank_sampah_report"

    id = Column(Integer, primary_key=True, index=True)
    desa_kelurahan = Column(String(100), nullable=False)
    nama_bank_sampah = Column(String(100), nullable=False)
    rt = Column(String(5), nullable=True)
    rw = Column(String(5), nullable=True)
    jumlah_nasabah = Column(Integer, nullable=False)
    nasabah_aktif = Column(Integer, nullable=False)
    pembelian_kg = Column(Float, nullable=False)
    jumlah_pembelian_rp = Column(Float, nullable=False)
    penjualan_kg = Column(Float, nullable=False)
    jumlah_penjualan_rp = Column(Float, nullable=False)
    nama_pengepul = Column(String(100), nullable=True)
    tanggal = Column(Date, nullable=False)  

class BankSampahRegistration(Base):
    __tablename__ = "bank_sampah_registration"

    id = Column(Integer, primary_key=True, index=True)
    desa_kelurahan = Column(String(100), nullable=False)
    nama_bank_sampah = Column(String(100), nullable=False)
    rt = Column(String(5), nullable=True)
    rw = Column(String(5), nullable=True)
    tanggal_pendaftaran = Column(Date, nullable=False)
    nama_pengepul = Column(String(100), nullable=False)
    
class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
