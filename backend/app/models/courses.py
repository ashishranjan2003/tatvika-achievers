from typing import Literal

from pydantic import BaseModel, Field


class SectionConfig(BaseModel):
    id: str
    label: str
    href: str
    parent: str | None = None
    targets: list[str] = Field(default_factory=list)
    current_status: Literal['active', 'empty', 'coming_soon'] = 'active'


class NavigationResponse(BaseModel):
    nav_items: list[SectionConfig]


class PortalSectionResponse(BaseModel):
    section_id: str
    menu_label: str
    href: str
    current_status: Literal['active', 'empty', 'coming_soon']
    title: str
    subtitle: str | None = None
