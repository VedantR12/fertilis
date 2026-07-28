from pydantic import BaseModel

from app.models.enums import UserRole


class UserCreate(BaseModel):
    username: str
    full_name: str
    password: str
    role: UserRole


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
    role: UserRole
    is_active: bool

    model_config = {
        "from_attributes": True
    }