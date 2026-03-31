from fastapi import Header


def get_current_user_id(x_user_id: str | None = Header(default=None)) -> str:
    return x_user_id or "00000000-0000-0000-0000-000000000001"
