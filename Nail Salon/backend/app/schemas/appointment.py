from pydantic import BaseModel
from typing import Optional
from datetime import date


class AppointmentCreate(BaseModel):
    service_id: int
    appointment_date: date
    appointment_time: str
    notes: Optional[str] = None


class AppointmentOut(BaseModel):
    id: int
    service_name: str
    client_name: Optional[str] = None
    appointment_date: date
    appointment_time: str
    status: str
    notes: Optional[str] = None

    class Config:
        from_attributes = True
