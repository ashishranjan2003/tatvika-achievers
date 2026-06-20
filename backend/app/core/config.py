import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parents[2] / '.env')

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
DATABASE_NAME = os.getenv('DATABASE_NAME', 'tatvika')
DEFAULT_COLLECTION = 'content_sections'
API_V1_PREFIX = '/api/v1'
ENVIRONMENT = os.getenv('ENVIRONMENT', 'development').lower()
ADMIN_API_TOKEN = os.getenv('ADMIN_API_TOKEN')

if not ADMIN_API_TOKEN and ENVIRONMENT != 'production':
    ADMIN_API_TOKEN = 'dev-admin-token'
FRONTEND_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        'FRONTEND_ORIGINS',
        'http://127.0.0.1:5173,http://localhost:5173',
    ).split(',')
    if origin.strip()
]
