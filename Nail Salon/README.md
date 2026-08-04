# Glow Nails Studio

Aplicación web completa para una marca premium de manicura y nail art, con frontend en React + TypeScript + Tailwind, backend en FastAPI + SQLAlchemy + PostgreSQL y autenticación JWT.

## Características
- Landing page premium con diseño elegante y responsive
- Registro e inicio de sesión
- Perfil editable y cambio de contraseña
- Reserva de citas con validación de horarios
- Dashboard administrativo
- CRUD de servicios y gestión de citas
- Seguridad básica con JWT y hash de contraseñas

## Estructura
- frontend/
- backend/
- database/
- docs/
- uploads/

## Requisitos
- Node.js 20+
- Python 3.13+
- PostgreSQL

## Instalación

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
```

### 2. Base de datos
Crear base de datos PostgreSQL y cargar:
```bash
psql -U postgres -f database/init.sql
```

### 3. Variables de entorno
Copiar el archivo `.env.example` a `.env` y ajustar valores.

### 4. Ejecutar backend
```bash
uvicorn app.main:app --reload --port 8000
```

### 5. Ejecutar frontend
```bash
cd frontend
npm install
npm run dev
```

## Despliegue
- Frontend: Vercel
- Backend: Render
- Base de datos: Supabase PostgreSQL

## Documentación adicional
- docs/technical-manual.md
- docs/user-manual.md
