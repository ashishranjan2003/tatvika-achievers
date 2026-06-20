from fastapi import APIRouter, Depends, Header, HTTPException, status

from app.core.config import ADMIN_API_TOKEN
from app.crud.admin import delete_section, upsert_section
from app.models.admin import LayoutUpdateRequest

router = APIRouter(prefix='/admin', tags=['admin'])


async def require_admin_token(x_admin_token: str | None = Header(default=None)) -> None:
    if not x_admin_token or x_admin_token != ADMIN_API_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Valid admin token is required',
        )


def build_section_document(payload: LayoutUpdateRequest) -> dict:
    document = payload.model_dump()
    layout = document.pop('layout', {})

    # Normalize the nested polymorphic layout into the existing database shape.
    document.update(layout)
    document['current_status'] = layout['current_status']

    return document


@router.post('/sections', dependencies=[Depends(require_admin_token)])
async def create_section(payload: LayoutUpdateRequest) -> dict:
    document = build_section_document(payload)
    return await upsert_section(document)


@router.put('/sections/{section_id}/layout', dependencies=[Depends(require_admin_token)])
async def update_layout(section_id: str, payload: LayoutUpdateRequest) -> dict:
    if payload.section_id != section_id:
        raise HTTPException(status_code=400, detail='section_id in path and body must match')

    document = build_section_document(payload)
    document['section_id'] = section_id

    return await upsert_section(document)


@router.delete('/sections/{section_id}', dependencies=[Depends(require_admin_token)])
async def remove_section(section_id: str) -> dict:
    result = await delete_section(section_id)
    if result['deleted_count'] == 0:
        raise HTTPException(status_code=404, detail='Section not found')
    return result
