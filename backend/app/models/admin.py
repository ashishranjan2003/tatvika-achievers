from pydantic import BaseModel, Field

from app.models.common import PathText, RequiredText, SectionLayoutType


class LayoutUpdateRequest(BaseModel):
    section_id: RequiredText
    menu_label: RequiredText
    route_path: PathText
    layout: SectionLayoutType = Field(..., discriminator='current_status')
