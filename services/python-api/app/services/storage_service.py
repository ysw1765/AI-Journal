from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile


class StorageService:
    def __init__(self, base_dir: str = "tmp/uploads") -> None:
        self.base_path = Path(base_dir)
        self.base_path.mkdir(parents=True, exist_ok=True)

    async def upload(self, file: UploadFile) -> dict:
        suffix = Path(file.filename or "").suffix
        stored_name = f"{uuid4()}{suffix}"
        target_path = self.base_path / stored_name
        content = await file.read()
        target_path.write_bytes(content)

        return {
            "path": str(target_path),
            "public_url": f"/mock-storage/{stored_name}",
            "size_bytes": len(content),
        }


storage_service = StorageService()
