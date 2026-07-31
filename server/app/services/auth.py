from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.models.user import User


class AuthService:

    @staticmethod
    def get_user_by_username(
        db: Session,
        username: str,
    ):
        return (
            db.query(User)
            .filter(User.username == username)
            .first()
        )

    @staticmethod
    def authenticate_user(
        db: Session,
        username: str,
        password: str,
    ):
        user = AuthService.get_user_by_username(
            db,
            username,
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive",
            )

        if not verify_password(
            password,
            user.password_hash,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password",
            )

        return user

    @staticmethod
    def login(
        db: Session,
        username: str,
        password: str,
    ):
        user = AuthService.authenticate_user(
            db=db,
            username=username,
            password=password,
        )

        access_token = create_access_token(
            data={
                "sub": user.username,
                "user_id": user.id,
                "role": user.role.value,
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }