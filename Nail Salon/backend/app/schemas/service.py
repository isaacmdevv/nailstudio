from pydantic import BaseModel
from typing import Optional


class ServiceCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    duration_minutes: int
    image_url: Optional[str] = None


class ServiceOut(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    duration_minutes: int
    image_url: Optional[str] = None

    class Config:
        from_attributes = True
