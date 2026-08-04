from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class Promotion(Base):
    __tablename__ = 'promotions'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    discount_percent = Column(Integer, default=0)
    active = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
