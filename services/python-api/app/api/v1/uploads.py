from fastapi import APIRouter, File, UploadFile

from app.schemas.upload import ImageUploadResponse

router = APIRouter()


@router.post("/images", response_model=ImageUploadResponse)
async def upload_image(file: UploadFile = File(...)) -> ImageUploadResponse:
    return ImageUploadResponse(
        image_id="00000000-0000-0000-0000-000000000101",
        image_url=f"/mock-storage/{file.filename}",
        mime_type=file.content_type or "application/octet-stream",
        size_bytes=0,
    )
