from pydantic import BaseModel


class ImageAnalysisResponse(BaseModel):
    analysis_id: str
    summary: str
    detected_objects: list[str]
    scene_tags: list[str]
    emotion_tags: list[str]
    raw_result: dict
