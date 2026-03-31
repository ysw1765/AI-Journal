from datetime import datetime

from pydantic import BaseModel


class CreateChatSessionRequest(BaseModel):
    image_id: str
    title: str | None = None


class CreateChatSessionResponse(BaseModel):
    session_id: str
    status: str


class SendMessageRequest(BaseModel):
    content: str
    stream: bool = False


class ChatMessage(BaseModel):
    id: str
    role: str
    content: str
    sequence_no: int
    created_at: datetime


class EndChatResponse(BaseModel):
    session_id: str
    diary_id: str
    title: str
    content: str
