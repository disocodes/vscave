from sqlalchemy.orm import Session
from sqlalchemy import desc
import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# User operations
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        is_active=user.is_active,
        is_superuser=user.is_superuser,
        permissions=user.permissions
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Widget operations
def create_widget(db: Session, widget: schemas.WidgetCreate):
    db_widget = models.Widget(**widget.dict())
    db.add(db_widget)
    db.commit()
    db.refresh(db_widget)
    return db_widget

def get_widgets_by_domain(db: Session, domain: str):
    return db.query(models.Widget).filter(models.Widget.domain == domain).all()

# Alert operations
def create_alert(db: Session, alert: schemas.AlertCreate):
    db_alert = models.Alert(**alert.dict())
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

def get_alerts_by_domain(db: Session, domain: str):
    return db.query(models.Alert)\
        .filter(models.Alert.domain == domain)\
        .order_by(desc(models.Alert.created_at))\
        .all()

# Integration operations
def create_integration(db: Session, integration: schemas.IntegrationCreate):
    db_integration = models.Integration(**integration.dict())
    db.add(db_integration)
    db.commit()
    db.refresh(db_integration)
    return db_integration

def get_integrations(db: Session):
    return db.query(models.Integration).all()

# Settings operations
def update_setting(db: Session, key: str, value: dict):
    db_setting = db.query(models.Setting).filter(models.Setting.key == key).first()
    if db_setting:
        db_setting.value = value
    else:
        db_setting = models.Setting(key=key, value=value)
        db.add(db_setting)
    db.commit()
    db.refresh(db_setting)
    return db_setting

def get_setting(db: Session, key: str):
    return db.query(models.Setting).filter(models.Setting.key == key).first()
