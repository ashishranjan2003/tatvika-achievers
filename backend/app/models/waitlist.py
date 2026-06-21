import re
from datetime import datetime

from pydantic import BaseModel, Field, field_validator

from app.models.common import RequiredText


class WaitlistCreateRequest(BaseModel):
    email: str
    section_id: RequiredText

    @field_validator('email')
    @classmethod
    def validate_email(cls, value: str) -> str:
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', value):
            raise ValueError('Invalid email address')
        return value.strip().lower()
    name: str | None = Field(default=None, max_length=160)
    phone: str | None = Field(default=None, max_length=20)
    source: str = Field(default='notify-me', max_length=80)


class WaitlistResponse(BaseModel):
    message: str
    signup_id: str


class WaitlistDocument(BaseModel):
    signup_id: str
    section_id: str
    email: str
    name: str | None = None
    phone: str | None = None
    source: str = 'notify-me'
    created_at: datetime
