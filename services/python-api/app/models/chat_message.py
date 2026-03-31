from dataclasses import dataclass
from datetime import datetime


@dataclass(slots=True)
class ChatMessageModel:
    id: str
    session_id: str
    role: str
    content: str
    created_at: datetime
