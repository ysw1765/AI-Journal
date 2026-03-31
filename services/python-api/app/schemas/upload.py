from pydantic import BaseModel


class ImageUploadResponse(BaseModel):
    image_id: str
    image_url: str
    mime_type: str
    size_bytes: int
