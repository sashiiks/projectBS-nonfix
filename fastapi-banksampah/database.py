# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# URL Database sesuai konfigurasi Anda
URL_DATABASE = 'postgresql://postgres:test1234!@localhost:5432/BankSampahCSR'

# Membuat engine untuk menghubungkan ke PostgreSQL
engine = create_engine(URL_DATABASE)

# Membuat session untuk berinteraksi dengan database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Membuat base class untuk model
Base = declarative_base()
