from dataclasses import dataclass
import os


@dataclass(slots=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "AI Diary API")
    environment: str = os.getenv("PYTHON_API_ENV", "development")
    api_prefix: str = os.getenv("API_PREFIX", "/api/v1")
    secret_key: str = os.getenv("PYTHON_API_SECRET_KEY", "replace-me")
    database_url: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://ai_diary:ai_diary@localhost:5432/ai_diary",
    )
    redis_url: str = os.getenv("REDIS_URL", "redis://localhost:6379/0")
    s3_endpoint: str = os.getenv("S3_ENDPOINT", "http://localhost:9000")
    s3_bucket: str = os.getenv("MINIO_BUCKET", "ai-diary")


settings = Settings()
