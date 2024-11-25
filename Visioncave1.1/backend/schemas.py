from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from datetime import datetime

class UserBase(BaseModel):
    email: str
    is_active: bool = True
    is_superuser: bool = False
    permissions: Dict[str, bool] = {}

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class WidgetBase(BaseModel):
    title: str
    type: str
    config: Dict[str, Any]
    domain: str
    position: int
    size: str

class WidgetCreate(WidgetBase):
    pass

class Widget(WidgetBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class AlertBase(BaseModel):
    domain: str
    message: str
    level: str
    metadata: Optional[Dict[str, Any]]

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        orm_mode = True

class IntegrationBase(BaseModel):
    name: str
    type: str
    config: Dict[str, Any]
    is_active: bool = True

class IntegrationCreate(IntegrationBase):
    pass

class Integration(IntegrationBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True

class SettingUpdate(BaseModel):
    value: Dict[str, Any]

class Setting(BaseModel):
    key: str
    value: Dict[str, Any]
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
