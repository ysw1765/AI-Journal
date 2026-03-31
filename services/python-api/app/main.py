from fastapi import FastAPI

from app.api.v1.api import api_router

app = FastAPI(
    title="AI Diary API",
    version="0.1.0",
    description="Backend service for image uploads, chat sessions, and diary generation.",
)


@app.get("/healthz", tags=["system"])
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(api_router, prefix="/api/v1")
