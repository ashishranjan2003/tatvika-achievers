from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import DATABASE_NAME, MONGO_URI


client: AsyncIOMotorClient | None = None


async def connect_db() -> None:
    global client
    client = AsyncIOMotorClient(MONGO_URI)


async def close_db() -> None:
    global client
    if client is not None:
        client.close()
        client = None


def get_db():
    if client is None:
        raise RuntimeError('Database client is not initialized. Did you start the app?')
    return client[DATABASE_NAME]
