from fastapi import APIRouter, HTTPException, status

from app.crud.portal import create_waitlist_signup, get_navigation, get_section, list_sections
from app.models.common import SectionLayoutResponse
from app.models.courses import NavigationResponse, PortalSectionResponse
from app.models.waitlist import WaitlistCreateRequest, WaitlistResponse

router = APIRouter(prefix='/portal', tags=['portal'])


@router.get('/navigation', response_model=NavigationResponse)
async def navigation() -> NavigationResponse:
    items = await get_navigation()
    return NavigationResponse(nav_items=items)


@router.get('/sections', response_model=list[PortalSectionResponse])
async def sections() -> list[PortalSectionResponse]:
    items = await list_sections()
    return [
        PortalSectionResponse(
            section_id=item['section_id'],
            menu_label=item['menu_label'],
            href=item['route_path'],
            current_status=item.get('current_status', 'active'),
            title=item.get('title', item['menu_label']),
            subtitle=item.get('subtitle'),
        )
        for item in items
    ]


@router.get('/sections/{section_id}', response_model=SectionLayoutResponse)
async def section_detail(section_id: str) -> SectionLayoutResponse:
    item = await get_section(section_id)
    if item is None:
        raise HTTPException(status_code=404, detail='Section not found')

    layout = None
    status = item.get('current_status', 'active')
    if status == 'active':
        layout = {
            'current_status': 'active',
            'title': item.get('title', item['menu_label']),
            'subtitle': item.get('subtitle'),
            'cards': item.get('cards', []),
            'filters': item.get('filters', []),
        }
    elif status == 'empty':
        layout = {
            'current_status': 'empty',
            'title': item.get('title', item['menu_label']),
            'message': item.get('message', 'No content is available yet.'),
            'guidance': item.get('guidance'),
        }
    else:
        layout = {
            'current_status': 'coming_soon',
            'heading': item.get('heading', 'Professional courses launching soon'),
            'subheading': item.get('subheading', 'Foundation & Post-Foundation content is being prepared.'),
            'preview_items': item.get('preview_items', []),
            'cta_label': item.get('cta_label', 'Notify me when live'),
        }

    return SectionLayoutResponse(
        section_id=item['section_id'],
        menu_label=item['menu_label'],
        route_path=item['route_path'],
        layout=layout,
    )


@router.post('/waitlist', response_model=WaitlistResponse, status_code=status.HTTP_201_CREATED)
async def waitlist_signup(payload: WaitlistCreateRequest) -> WaitlistResponse:
    """
    Register a new waitlist entry.

    Used by coming-soon sections and professional launch pages to capture
    visitor interest before content is published.
    """
    result = await create_waitlist_signup(payload.model_dump())
    return WaitlistResponse(**result)
