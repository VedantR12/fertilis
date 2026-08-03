from pydantic import BaseModel, Field


class DFICreate(BaseModel):
    sample_code: str

    volume_ml: float = Field(ge=0)

    liquefaction_minutes: int = Field(ge=0)

    viscosity: str

    ph: float = Field(ge=0, le=14)

    sperm_concentration_raw: float = Field(ge=0)

    non_fragmented_count: int = Field(ge=0)

    fragmented_count: int = Field(ge=0)

    large_halo_count: int = Field(ge=0)

    medium_halo_count: int = Field(ge=0)

    small_halo_count: int = Field(ge=0)

    no_halo_count: int = Field(ge=0)

    degraded_count: int = Field(ge=0)

    remarks: str | None = None


class DFIUpdate(BaseModel):
    volume_ml: float | None = Field(default=None, ge=0)

    liquefaction_minutes: int | None = Field(default=None, ge=0)
    
    viscosity: str | None = None
    
    ph: float | None = Field(default=None, ge=0, le=14)
    
    sperm_concentration_raw: float | None = Field(default=None, ge=0)
    
    non_fragmented_count: int | None = Field(default=None, ge=0)

    fragmented_count: int | None = Field(default=None, ge=0)

    large_halo_count: int | None = Field(default=None, ge=0)

    medium_halo_count: int | None = Field(default=None, ge=0)

    small_halo_count: int | None = Field(default=None, ge=0)

    no_halo_count: int | None = Field(default=None, ge=0)

    degraded_count: int | None = Field(default=None, ge=0)
    
    remarks: str | None = None


class DFIResponse(BaseModel):
    id: int

    sample_code: str
    
    volume_ml: float
    
    liquefaction_minutes: int
    
    viscosity: str
    
    ph: float
    
    sperm_concentration_raw: float
    
    non_fragmented_count: int
    
    fragmented_count: int
    
    large_halo_count: int
    
    medium_halo_count: int
    
    small_halo_count: int
    
    no_halo_count: int
    
    degraded_count: int
    
    remarks: str | None

    model_config = {
        "from_attributes": True,
    }