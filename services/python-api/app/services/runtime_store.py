from app.models.chat_session import ChatSession
from app.models.image import Image


class RuntimeStore:
    def __init__(self) -> None:
        self.images: dict[str, Image] = {}
        self.chat_sessions: dict[str, ChatSession] = {}


runtime_store = RuntimeStore()
