from pydantic import BaseModel, Field


class DFICreate(BaseModel):
    sample_code: str

    dfi_percent: float = Field(ge=0, le=100)

    hds_percent: float = Field(ge=0, le=100)

    method: str

    remarks: str | None = None


class DFIUpdate(BaseModel):
    dfi_percent: float | None = Field(default=None, ge=0, le=100)

    hds_percent: float | None = Field(default=None, ge=0, le=100)

    method: str | None = None

    remarks: str | None = None


class DFIResponse(BaseModel):
    id: int

    sample_code: str

    dfi_percent: float

    hds_percent: float

    method: str

    remarks: str | None

    model_config = {
        "from_attributes": True,
    }