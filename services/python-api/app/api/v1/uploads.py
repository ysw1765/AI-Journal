from fastapi import APIRouter, Depends, File, UploadFile

from app.api.deps import get_current_user_id
from app.schemas.upload import ImageUploadResponse
from app.services.image_service import image_service
from app.services.storage_service import storage_service

router = APIRouter()


@router.post("/images", response_model=ImageUploadResponse)
async def upload_image(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
) -> ImageUploadResponse:
    stored = await storage_service.upload(file)
    image = image_service.create_image(
        user_id=user_id,
        mime_type=file.content_type or "application/octet-stream",
        size_bytes=stored["size_bytes"],
        public_url=stored["public_url"],
    )

    return ImageUploadResponse(
        image_id=image.id,
        image_url=image.public_url,
        mime_type=image.mime_type,
        size_bytes=image.size_bytes,
    )
