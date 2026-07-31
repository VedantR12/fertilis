from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import (
    get_current_user,
    require_admin,
)
from app.models.user import User

from app.schemas.auth import (
    LoginRequest,
    TokenResponse,
)
from app.schemas.user import UserResponse

from app.services.auth import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.login(
        db=db,
        username=data.username,
        password=data.password,
    )


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.get("/admin-test")
def admin_test(
    current_user: User = Depends(require_admin),
):
    return {
        "message": f"Welcome {current_user.full_name}",
        "role": current_user.role,
    }


@router.get("/health")
def auth_health():
    return {
        "message": "Authentication API Ready",
    }