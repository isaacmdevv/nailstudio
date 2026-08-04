from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class AdminProfile(Base):
    __tablename__ = 'admin_profiles'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    business_name = Column(String(150), nullable=False)
    slogan = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
