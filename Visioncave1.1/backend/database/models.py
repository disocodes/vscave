from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, JSON, DateTime, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    permissions = Column(JSON)

class Widget(Base):
    __tablename__ = "widgets"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    type = Column(String)
    config = Column(JSON)
    domain = Column(String, index=True)
    position = Column(Integer)
    size = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    user = relationship("User", back_populates="widgets")

class DomainData(Base):
    __tablename__ = "domain_data"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String, index=True)
    data_type = Column(String, index=True)
    value = Column(Float)
    metadata = Column(JSON)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String, index=True)
    message = Column(String)
    level = Column(String)
    metadata = Column(JSON)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    type = Column(String)  # nodered, n8n, etc.
    config = Column(JSON)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Setting(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True)
    value = Column(JSON)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
