from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.routes.auth import get_current_user
from app.db.session import get_db
from app.models.user import User

router = APIRouter(prefix='/users', tags=['users'])


@router.get('')
def list_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail='Admin only')
    return db.query(User).filter(User.role == 'client').all()
