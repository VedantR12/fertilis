from pydantic import BaseModel, Field


class MorphologyCreate(BaseModel):
    sample_code: str

    normal_forms_percent: float = Field(ge=0, le=100)

    head_defects_percent: float = Field(ge=0, le=100)

    neck_midpiece_defects_percent: float = Field(ge=0, le=100)

    tail_defects_percent: float = Field(ge=0, le=100)

    excess_residual_cytoplasm_percent: float = Field(ge=0, le=100)

    sperm_evaluated: int = Field(ge=1)


class MorphologyUpdate(BaseModel):
    normal_forms_percent: float | None = Field(default=None, ge=0, le=100)

    head_defects_percent: float | None = Field(default=None, ge=0, le=100)

    neck_midpiece_defects_percent: float | None = Field(default=None, ge=0, le=100)

    tail_defects_percent: float | None = Field(default=None, ge=0, le=100)

    excess_residual_cytoplasm_percent: float | None = Field(default=None, ge=0, le=100)

    sperm_evaluated: int | None = Field(default=None, ge=1)


class MorphologyResponse(BaseModel):
    id: int

    sample_code: str

    normal_forms_percent: float

    head_defects_percent: float

    neck_midpiece_defects_percent: float

    tail_defects_percent: float

    excess_residual_cytoplasm_percent: float

    sperm_evaluated: int

    model_config = {
        "from_attributes": True,
    }