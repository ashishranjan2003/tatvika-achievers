from motor.motor_asyncio import AsyncIOMotorClient

from app.core.config import DATABASE_NAME, MONGO_URI


client: AsyncIOMotorClient | None = None


async def setup_indexes() -> None:
    """Create required database indexes."""
    if client is None:
        raise RuntimeError('Database client not initialized')

    db = client[DATABASE_NAME]
    content_sections = db.content_sections
    waitlist_signups = db.waitlist_signups

    # Content sections indexes
    await content_sections.create_index('section_id', unique=True)
    await content_sections.create_index([('title', 'text'), ('subtitle', 'text')])

    # Waitlist indexes
    await waitlist_signups.create_index('email')
    await waitlist_signups.create_index('section_id')
    await waitlist_signups.create_index('created_at')


async def connect_db() -> None:
    global client
    client = AsyncIOMotorClient(MONGO_URI)
    await setup_indexes()


async def close_db() -> None:
    global client
    if client is not None:
        client.close()
        client = None


def get_db():
    if client is None:
        raise RuntimeError('Database client is not initialized. Did you start the app?')
    return client[DATABASE_NAME]
