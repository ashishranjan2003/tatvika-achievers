from typing import Any

from app.database import get_db


async def upsert_section(payload: dict[str, Any]) -> dict[str, Any]:
    db = get_db()
    section_id = payload['section_id']

    result = await db.content_sections.update_one(
        {'section_id': section_id},
        {'$set': payload},
        upsert=True,
    )

    return {
        'section_id': section_id,
        'matched_count': result.matched_count,
        'modified_count': result.modified_count,
        'upserted_id': str(result.upserted_id) if result.upserted_id else None,
    }


async def delete_section(section_id: str) -> dict[str, Any]:
    db = get_db()
    result = await db.content_sections.delete_one({'section_id': section_id})
    return {'deleted_count': result.deleted_count}
