from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import auth, services, appointments, users, dashboard
from app.db.session import Base, engine
from app.models import user, service, appointment, payment, promotion, schedule, admin
from app.core.seed import seed_data

app = FastAPI(title='Glow Nails Studio API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

Base.metadata.create_all(bind=engine)
seed_data()

app.include_router(auth.router)
app.include_router(services.router)
app.include_router(appointments.router)
app.include_router(users.router)
app.include_router(dashboard.router)

@app.get('/')
def root():
    return {'message': 'Glow Nails Studio API is running'}
