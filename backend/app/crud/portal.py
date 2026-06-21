from datetime import datetime
from typing import Any

from app.database import get_db


async def create_waitlist_signup(payload: dict[str, Any]) -> dict[str, Any]:
    """Insert a new waitlist signup document into MongoDB."""
    db = get_db()
    document = {
        **payload,
        'signup_id': f'signup-{datetime.utcnow().timestamp()}',
        'created_at': datetime.utcnow(),
    }
    result = await db.waitlist_signups.insert_one(document)
    return {
        'message': 'You have been added to the waitlist.',
        'signup_id': str(result.inserted_id),
    }


async def list_sections() -> list[dict[str, Any]]:
    db = get_db()
    documents = await db.content_sections.find({}, {'_id': 0}).to_list(length=None)
    return documents


async def get_section(section_id: str) -> dict[str, Any] | None:
    db = get_db()
    document = await db.content_sections.find_one({'section_id': section_id}, {'_id': 0})
    return document


async def get_navigation() -> list[dict[str, Any]]:
    db = get_db()
    documents = await db.content_sections.find({}, {'_id': 0}).to_list(length=None)
    return [
        {
            'id': item.get('section_id'),
            'label': item.get('menu_label'),
            'href': item.get('route_path'),
            'parent': item.get('parent_label'),
            'targets': item.get('targets', []),
            'current_status': item.get('current_status', 'active'),
        }
        for item in documents
    ]
