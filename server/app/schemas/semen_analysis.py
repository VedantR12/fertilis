from pydantic import BaseModel, Field


class SemenAnalysisCreate(BaseModel):
    sample_code: str

    volume_ml: float = Field(ge=0)

    ph: float = Field(ge=0, le=14)

    concentration_million_ml: float = Field(ge=0)

    total_motility_percent: float = Field(ge=0, le=100)

    progressive_motility_percent: float = Field(ge=0, le=100)

    morphology_percent: float = Field(ge=0, le=100)

    vitality_percent: float = Field(ge=0, le=100)

    wbc_million_ml: float = Field(ge=0)

    liquefaction_minutes: int = Field(ge=0)

    viscosity: str = Field(
        min_length=1,
        max_length=50,
    )

    appearance: str = Field(
        min_length=1,
        max_length=100,
    )


class SemenAnalysisUpdate(BaseModel):
    volume_ml: float | None = Field(default=None, ge=0)

    ph: float | None = Field(default=None, ge=0, le=14)

    concentration_million_ml: float | None = Field(default=None, ge=0)

    total_motility_percent: float | None = Field(default=None, ge=0, le=100)

    progressive_motility_percent: float | None = Field(default=None, ge=0, le=100)

    morphology_percent: float | None = Field(default=None, ge=0, le=100)

    vitality_percent: float | None = Field(default=None, ge=0, le=100)

    wbc_million_ml: float | None = Field(default=None, ge=0)

    liquefaction_minutes: int | None = Field(default=None, ge=0)

    viscosity: str | None = Field(default=None, max_length=50)

    appearance: str | None = Field(default=None, max_length=100)


class SemenAnalysisResponse(BaseModel):
    id: int

    sample_code: str

    volume_ml: float

    ph: float

    concentration_million_ml: float

    total_motility_percent: float

    progressive_motility_percent: float

    morphology_percent: float

    vitality_percent: float

    wbc_million_ml: float

    liquefaction_minutes: int

    viscosity: str

    appearance: str

    model_config = {
        "from_attributes": True
    }
    