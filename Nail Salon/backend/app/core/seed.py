from passlib.context import CryptContext
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.service import Service
from app.models.user import User

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def seed_data() -> None:
    db: Session = SessionLocal()
    try:
        admin = db.query(User).filter(User.email == 'admin@glownails.com').first()
        if not admin:
            db.add(
                User(
                    full_name='Glow Admin',
                    email='admin@glownails.com',
                    password_hash=pwd_context.hash('Admin123!'),
                    role='admin',
                    is_active=True,
                )
            )

        if db.query(Service).count() == 0:
            db.add_all(
                [
                    Service(
                        name='Manicure Clásica',
                        description='Diseño elegante y acabado refinado para cada ocasión.',
                        price=45,
                        duration_minutes=45,
                        image_url='https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
                    ),
                    Service(
                        name='Manicure Gel',
                        description='Durabilidad y brillo impecable durante semanas.',
                        price=70,
                        duration_minutes=60,
                        image_url='https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80',
                    ),
                    Service(
                        name='Acrílicas',
                        description='Largo y forma personalizada con estilo profesional.',
                        price=95,
                        duration_minutes=90,
                        image_url='https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
                    ),
                ]
            )
        db.commit()
    finally:
        db.close()
