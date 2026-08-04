from datetime import date
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.api.routes.auth import get_current_user
from app.db.session import get_db
from app.models.appointment import Appointment
from app.models.service import Service
from app.models.user import User
from app.schemas.appointment import AppointmentCreate, AppointmentOut

router = APIRouter(prefix='/appointments', tags=['appointments'])


@router.post('', response_model=AppointmentOut)
def create_appointment(payload: AppointmentCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == payload.service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail='Service not found')
    existing = db.query(Appointment).filter(
        Appointment.appointment_date == payload.appointment_date,
        Appointment.appointment_time == payload.appointment_time,
        Appointment.status != 'cancelada',
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail='Time slot is already booked')
    appointment = Appointment(
        user_id=current_user.id,
        service_id=payload.service_id,
        appointment_date=payload.appointment_date,
        appointment_time=payload.appointment_time,
        notes=payload.notes,
        status='pendiente',
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return AppointmentOut(id=appointment.id, service_name=service.name, client_name=current_user.full_name, appointment_date=appointment.appointment_date, appointment_time=appointment.appointment_time, status=appointment.status, notes=appointment.notes)


@router.get('/me')
def my_appointments(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(Appointment.user_id == current_user.id).all()
    result = []
    for appointment in appointments:
        result.append({
            'id': appointment.id,
            'service_name': appointment.service.name,
            'appointment_date': appointment.appointment_date,
            'appointment_time': appointment.appointment_time,
            'status': appointment.status,
        })
    return result


@router.get('')
def list_appointments(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Admin only')
    appointments = db.query(Appointment).all()
    result = []
    for appointment in appointments:
        result.append({
            'id': appointment.id,
            'service_name': appointment.service.name,
            'client_name': appointment.user.full_name,
            'appointment_date': appointment.appointment_date,
            'appointment_time': appointment.appointment_time,
            'status': appointment.status,
        })
    return result


@router.patch('/{appointment_id}/cancel')
def cancel_appointment(appointment_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail='Appointment not found')
    if appointment.user_id != current_user.id and current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Not authorized')
    appointment.status = 'cancelada'
    db.commit()
    return {'message': 'Appointment cancelled'}


@router.patch('/{appointment_id}/status')
def update_status(appointment_id: int, status: str, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Admin only')
    appointment = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail='Appointment not found')
    appointment.status = status
    db.commit()
    return {'message': 'Appointment updated'}


@router.get('/available-slots')
def available_slots(date_value: str = Query(...), db: Session = Depends(get_db)):
    appointments = db.query(Appointment).filter(Appointment.appointment_date == date_value, Appointment.status != 'cancelada').all()
    busy_times = {item.appointment_time for item in appointments}
    slots = [
        {'date': date_value, 'time': '10:00'},
        {'date': date_value, 'time': '11:00'},
        {'date': date_value, 'time': '12:00'},
        {'date': date_value, 'time': '13:00'},
        {'date': date_value, 'time': '14:00'},
        {'date': date_value, 'time': '15:00'},
        {'date': date_value, 'time': '16:00'},
        {'date': date_value, 'time': '17:00'},
    ]
    return [slot for slot in slots if slot['time'] not in busy_times]
