from datetime import UTC, datetime

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_current_user_id
from app.schemas.chat import (
    ChatMessage,
    CreateChatSessionRequest,
    CreateChatSessionResponse,
    EndChatResponse,
    SendMessageRequest,
)
from app.services.chat_service import chat_service
from app.services.image_service import image_service

router = APIRouter()


@router.post("/sessions", response_model=CreateChatSessionResponse)
def create_session(
    payload: CreateChatSessionRequest,
    user_id: str = Depends(get_current_user_id),
) -> CreateChatSessionResponse:
    image = image_service.get_image(payload.image_id)
    if image is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="image not found",
        )

    if image.user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="image does not belong to current user",
        )

    session = chat_service.create_session(user_id=user_id, image_id=payload.image_id)

    return CreateChatSessionResponse(
        session_id=session.id,
        status=session.status,
    )


@router.post("/sessions/{session_id}/messages", response_model=ChatMessage)
def send_message(
    session_id: str,
    payload: SendMessageRequest,
) -> ChatMessage:
    return ChatMessage(
        id="00000000-0000-0000-0000-000000000301",
        role="assistant",
        content=f"Echo from {session_id}: {payload.content}",
        sequence_no=1,
        created_at=datetime.now(UTC),
    )


@router.post("/sessions/{session_id}/end", response_model=EndChatResponse)
def end_session(session_id: str) -> EndChatResponse:
    return EndChatResponse(
        session_id=session_id,
        diary_id="00000000-0000-0000-0000-000000000401",
        title="Generated diary draft",
        content="This is a placeholder diary generated from the chat session.",
    )
