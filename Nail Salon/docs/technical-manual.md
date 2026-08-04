# Manual técnico

## Arquitectura
- Frontend: React + TypeScript + Vite + TailwindCSS
- Backend: FastAPI + SQLAlchemy + PostgreSQL
- Autenticación: JWT con passlib

## Endpoints principales
- POST /auth/register
- POST /auth/login
- GET /auth/me
- GET /services
- POST /services
- DELETE /services/{id}
- POST /appointments
- GET /appointments/me
- GET /appointments
- PATCH /appointments/{id}/cancel
- PATCH /appointments/{id}/status
- GET /dashboard/stats

## Variables de entorno
- DATABASE_URL
- SECRET_KEY
- VITE_API_URL
