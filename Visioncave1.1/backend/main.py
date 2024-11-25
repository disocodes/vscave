from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database.database import engine, get_db
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="VisionCave API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# User endpoints
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# Widget endpoints
@app.post("/widgets/", response_model=schemas.Widget)
def create_widget(widget: schemas.WidgetCreate, db: Session = Depends(get_db)):
    return crud.create_widget(db=db, widget=widget)

@app.get("/widgets/{domain}", response_model=List[schemas.Widget])
def read_domain_widgets(domain: str, db: Session = Depends(get_db)):
    widgets = crud.get_widgets_by_domain(db, domain=domain)
    return widgets

# Alert endpoints
@app.post("/alerts/", response_model=schemas.Alert)
def create_alert(alert: schemas.AlertCreate, db: Session = Depends(get_db)):
    return crud.create_alert(db=db, alert=alert)

@app.get("/alerts/{domain}", response_model=List[schemas.Alert])
def read_domain_alerts(domain: str, db: Session = Depends(get_db)):
    alerts = crud.get_alerts_by_domain(db, domain=domain)
    return alerts

# Integration endpoints
@app.post("/integrations/", response_model=schemas.Integration)
def create_integration(integration: schemas.IntegrationCreate, db: Session = Depends(get_db)):
    return crud.create_integration(db=db, integration=integration)

@app.get("/integrations/", response_model=List[schemas.Integration])
def read_integrations(db: Session = Depends(get_db)):
    return crud.get_integrations(db)

# Settings endpoints
@app.put("/settings/{key}", response_model=schemas.Setting)
def update_setting(key: str, setting: schemas.SettingUpdate, db: Session = Depends(get_db)):
    return crud.update_setting(db=db, key=key, value=setting.value)

@app.get("/settings/{key}", response_model=schemas.Setting)
def read_setting(key: str, db: Session = Depends(get_db)):
    setting = crud.get_setting(db=db, key=key)
    if setting is None:
        raise HTTPException(status_code=404, detail="Setting not found")
    return setting

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
