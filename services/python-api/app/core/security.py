from datetime import UTC, datetime, timedelta
import hashlib
import secrets


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(password: str, password_hash: str) -> bool:
    return hash_password(password) == password_hash


def create_access_token(subject: str, expires_in_minutes: int = 60) -> dict[str, str]:
    expires_at = datetime.now(UTC) + timedelta(minutes=expires_in_minutes)
    return {
        "access_token": f"dev-token-{subject}-{secrets.token_hex(8)}",
        "token_type": "bearer",
        "expires_at": expires_at.isoformat(),
    }
