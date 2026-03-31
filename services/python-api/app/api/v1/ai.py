from fastapi import APIRouter

from app.schemas.ai import ImageAnalysisResponse

router = APIRouter()


@router.post("/images/{image_id}/analyze", response_model=ImageAnalysisResponse)
def analyze_image(image_id: str) -> ImageAnalysisResponse:
    return ImageAnalysisResponse(
        analysis_id="00000000-0000-0000-0000-000000000201",
        summary=f"Mock analysis for image {image_id}",
        detected_objects=["person", "tree"],
        scene_tags=["outdoor", "memory"],
        emotion_tags=["calm"],
        raw_result={"image_id": image_id, "status": "mocked"},
    )
