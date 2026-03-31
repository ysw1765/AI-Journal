from dataclasses import dataclass, field
from datetime import date, datetime


@dataclass(slots=True)
class Diary:
    id: str
    user_id: str
    title: str
    diary_date: date
    content: str
    tags: list[str] = field(default_factory=list)
    created_at: datetime | None = None
