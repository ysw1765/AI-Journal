from dataclasses import dataclass, field


@dataclass(slots=True)
class ImageAnalysis:
    id: str
    image_id: str
    summary: str
    scene_tags: list[str] = field(default_factory=list)
