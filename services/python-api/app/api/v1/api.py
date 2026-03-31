from fastapi import APIRouter

from app.api.v1 import ai, auth, chat, diaries, uploads

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(uploads.router, prefix="/uploads", tags=["uploads"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(diaries.router, prefix="/diaries", tags=["diaries"])
