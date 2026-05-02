from datetime import UTC, datetime
from uuid import uuid4

from app.models.chat_session import ChatSession
from app.services.runtime_store import runtime_store


class ChatService:
    def create_session(self, *, user_id: str, image_id: str) -> ChatSession:
        session = ChatSession(
            id=str(uuid4()),
            user_id=user_id,
            image_id=image_id,
            status="active",
            started_at=datetime.now(UTC),
        )
        runtime_store.chat_sessions[session.id] = session
        return session


chat_service = ChatService()
