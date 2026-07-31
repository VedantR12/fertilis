from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.common import PaginationMeta

class SampleCreate(BaseModel):
    patient_code: str

    sample_type: str = Field(
        min_length=1,
        max_length=50,
    )

    collection_datetime: datetime

    abstinence_days: int = Field(
        ge=0,
        le=30,
    )

    collection_method: str | None = Field(
        default=None,
        max_length=50,
    )

    collection_place: str | None = Field(
        default=None,
        max_length=50,
    )

    remarks: str | None = None


class SampleUpdate(BaseModel):
    sample_type: str | None = Field(
        default=None,
        max_length=50,
    )

    collection_datetime: datetime | None = None

    abstinence_days: int | None = Field(
        default=None,
        ge=0,
        le=30,
    )

    status: str | None = Field(
        default=None,
        max_length=30,
    )
    
    collection_method: str | None = Field(
        default=None,
        max_length=50,
    )

    collection_place: str | None = Field(
        default=None,
        max_length=50,
    )

    remarks: str | None = None


class SampleResponse(BaseModel):
    id: int
    sample_code: str
    patient_code: str
    sample_type: str
    collection_datetime: datetime
    abstinence_days: int
    status: str
    collection_method: str | None
    collection_place: str | None
    remarks: str | None
    
    model_config = {
        "from_attributes": True
    }
    
class SampleListResponse(BaseModel):
    items: list[SampleResponse]
    pagination: PaginationMeta

    model_config = ConfigDict(from_attributes=True)