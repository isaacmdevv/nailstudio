from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.service import Service
from app.schemas.service import ServiceCreate, ServiceOut
from app.api.routes.auth import get_current_user
from app.models.user import User

router = APIRouter(prefix='/services', tags=['services'])


@router.get('', response_model=list[ServiceOut])
def list_services(db: Session = Depends(get_db)):
    return db.query(Service).order_by(Service.id.desc()).all()


@router.post('', response_model=ServiceOut)
def create_service(payload: ServiceCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Admin only')
    service = Service(**payload.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service


@router.delete('/{service_id}')
def delete_service(service_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Admin only')
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail='Service not found')
    db.delete(service)
    db.commit()
    return {'message': 'Service deleted'}
