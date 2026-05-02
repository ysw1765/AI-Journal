from uuid import uuid4

from app.models.image import Image
from app.services.runtime_store import runtime_store


class ImageService:
    def create_image(
        self,
        *,
        user_id: str,
        mime_type: str,
        size_bytes: int,
        public_url: str,
    ) -> Image:
        image = Image(
            id=str(uuid4()),
            user_id=user_id,
            mime_type=mime_type,
            size_bytes=size_bytes,
            public_url=public_url,
        )
        runtime_store.images[image.id] = image
        return image

    def get_image(self, image_id: str) -> Image | None:
        return runtime_store.images.get(image_id)


image_service = ImageService()
