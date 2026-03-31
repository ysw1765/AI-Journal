from datetime import date, datetime

from fastapi import APIRouter

from app.schemas.diary import DiaryDetail, DiaryItem

router = APIRouter()


@router.get("", response_model=list[DiaryItem])
def list_diaries() -> list[DiaryItem]:
    return [
        DiaryItem(
            id="00000000-0000-0000-0000-000000000501",
            title="第一次 AI 日记",
            diary_date=date.today(),
            cover_image_url="",
            mood="calm",
            tags=["demo"],
            created_at=datetime.utcnow(),
        )
    ]


@router.get("/{diary_id}", response_model=DiaryDetail)
def get_diary(diary_id: str) -> DiaryDetail:
    return DiaryDetail(
        id=diary_id,
        title="第一次 AI 日记",
        diary_date=date.today(),
        cover_image_url="",
        mood="calm",
        tags=["demo"],
        created_at=datetime.utcnow(),
        content="这里是单篇日记内容占位。",
        image_id="00000000-0000-0000-0000-000000000101",
        session_id="00000000-0000-0000-0000-000000000301",
    )
