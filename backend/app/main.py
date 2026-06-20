from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import API_V1_PREFIX, FRONTEND_ORIGINS
from app.database import close_db, connect_db
from app.routes.admin import router as admin_router
from app.routes.portal import router as portal_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    yield
    await close_db()


app = FastAPI(title='Tatvika API', version='1.0.0', lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(portal_router, prefix=API_V1_PREFIX)
app.include_router(admin_router, prefix=API_V1_PREFIX)


@app.get('/health')
async def health() -> dict[str, str]:
    return {'status': 'ok'}
