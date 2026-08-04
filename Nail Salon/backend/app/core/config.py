import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./glow_nails.db')
SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-glow-nails')
ALGORITHM = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24
