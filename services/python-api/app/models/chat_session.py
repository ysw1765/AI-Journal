from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class ChatSession:
    id: str
    user_id: str
    image_id: str
    status: str
    started_at: datetime
