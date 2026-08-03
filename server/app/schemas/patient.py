from typing import Optional

from pydantic import BaseModel, ConfigDict, Field
from app.schemas.common import PaginationMeta


class PatientCreate(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: Optional[str] = Field(default=None, max_length=100)
    age: int = Field(ge=0, le=120)
    phone: Optional[str] = Field(default=None, max_length=15)
    address: Optional[str] = Field(default=None, max_length=120)
    doctor: Optional[str] = Field(default=None, max_length=150)


class PatientUpdate(BaseModel):
    first_name: Optional[str] = Field(default=None, min_length=1, max_length=100)
    last_name: Optional[str] = Field(default=None, max_length=100)
    age: Optional[int] = Field(default=None, ge=0, le=120)
    phone: Optional[str] = Field(default=None, max_length=15)
    address: Optional[str] = Field(default=None, max_length=120)
    doctor: Optional[str] = Field(default=None, max_length=150)


class PatientResponse(BaseModel):
    id: int
    patient_code: str
    first_name: str
    last_name: Optional[str]
    age: int
    phone: Optional[str]
    address: Optional[str]
    doctor: Optional[str]

    model_config = ConfigDict(from_attributes=True)
    
class PatientListResponse(BaseModel):
    items: list[PatientResponse]
    pagination: PaginationMeta

    model_config = ConfigDict(from_attributes=True)