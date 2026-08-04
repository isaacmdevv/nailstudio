from sqlalchemy import Column, Integer, String, Date, Time, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class Schedule(Base):
    __tablename__ = 'schedules'

    id = Column(Integer, primary_key=True, index=True)
    day_of_week = Column(String(20), nullable=False)
    open_time = Column(String(10), nullable=False)
    close_time = Column(String(10), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
