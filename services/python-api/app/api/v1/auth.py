from fastapi import APIRouter

from app.core.security import create_access_token
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterRequest) -> TokenResponse:
    token = create_access_token(subject=payload.email)
    return TokenResponse(**token)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest) -> TokenResponse:
    token = create_access_token(subject=payload.email)
    return TokenResponse(**token)
