from dataclasses import dataclass


@dataclass(slots=True)
class Image:
    id: str
    user_id: str
    mime_type: str
    size_bytes: int
    public_url: str
