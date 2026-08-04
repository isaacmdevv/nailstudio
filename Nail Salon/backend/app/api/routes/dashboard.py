from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.routes.auth import get_current_user
from app.db.session import get_db
from app.models.appointment import Appointment
from app.models.service import Service
from app.models.user import User

router = APIRouter(prefix='/dashboard', tags=['dashboard'])


@router.get('/stats')
def stats(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'admin':
        return {'message': 'Admin only'}
    total_clients = db.query(User).filter(User.role == 'client').count()
    total_appointments = db.query(Appointment).count()
    revenue = sum(float(item.service.price) for item in db.query(Appointment).all())
    services_sold = db.query(Appointment).count()
    return {
        'total_clients': total_clients,
        'total_appointments': total_appointments,
        'revenue': round(revenue, 2),
        'services_sold': services_sold,
    }
