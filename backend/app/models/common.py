from typing import Annotated, Literal, Union

from pydantic import BaseModel, Field, StringConstraints


RequiredText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=160)]
OptionalText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=500)]
PathText = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=160, pattern=r'^/[-a-zA-Z0-9/_]*$')]


class BaseCard(BaseModel):
    id: RequiredText
    title: RequiredText
    subject: RequiredText
    description: OptionalText | None = None
    price: OptionalText | None = None
    actual_price: OptionalText | None = None
    class_section: OptionalText | None = None
    size: OptionalText | None = None
    questions: int | None = Field(default=None, ge=0, le=1000)
    duration: int | None = Field(default=None, ge=0, le=1000)
    action_label: OptionalText | None = None
    action_url: OptionalText | None = None
    preview_url: OptionalText | None = None
    download_url: OptionalText | None = None
    tags: list[RequiredText] = Field(default_factory=list, max_length=10)


class ActiveSectionLayout(BaseModel):
    current_status: Literal['active'] = 'active'
    title: RequiredText
    subtitle: OptionalText | None = None
    cards: list[BaseCard] = Field(default_factory=list, max_length=100)
    filters: list[RequiredText] = Field(default_factory=list, max_length=50)


class EmptySectionLayout(BaseModel):
    current_status: Literal['empty'] = 'empty'
    title: RequiredText
    message: RequiredText
    guidance: OptionalText | None = None


class ComingSoonLayout(BaseModel):
    current_status: Literal['coming_soon'] = 'coming_soon'
    heading: RequiredText
    subheading: RequiredText
    preview_items: list[RequiredText] = Field(default_factory=list, max_length=20)
    cta_label: RequiredText = 'Notify me when live'


SectionLayoutType = Union[ActiveSectionLayout, EmptySectionLayout, ComingSoonLayout]
SectionLayout = SectionLayoutType


class SectionLayoutResponse(BaseModel):
    section_id: RequiredText
    menu_label: RequiredText
    route_path: PathText
    layout: SectionLayout = Field(..., discriminator='current_status')
