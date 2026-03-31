from datetime import date, datetime

from pydantic import BaseModel


class DiaryItem(BaseModel):
    id: str
    title: str
    diary_date: date
    cover_image_url: str
    mood: str
    tags: list[str]
    created_at: datetime


class DiaryDetail(DiaryItem):
    content: str
    image_id: str
    session_id: str
