from sqlalchemy import Column, Integer, String, Float, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class AnalyticsData(Base):
    __tablename__ = "analytics_data"
    
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    value = Column(Float)
    category = Column(String)

class Alert(Base):
    __tablename__ = "alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    message = Column(String)
    level = Column(String)
    source = Column(String)

class Widget(Base):
    __tablename__ = "widgets"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    domain = Column(String, index=True)
    type = Column(String)
    config = Column(JSON)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.datetime.utcnow)

class VisionModule(Base):
    __tablename__ = "vision_modules"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    type = Column(String)  # detection, tracking, classification, etc.
    config = Column(JSON)
    code = Column(String)  # Python code for custom processing
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.datetime.utcnow)

class Integration(Base):
    __tablename__ = "integrations"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    type = Column(String)  # nodered, n8n, etc.
    config = Column(JSON)
    status = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, onupdate=datetime.datetime.utcnow)
