from pydantic import BaseModel, Field


class MorphologyCreate(BaseModel):
    sample_code: str

    normal_forms_percent: float = Field(ge=0, le=100)

    head_defects_percent: float = Field(ge=0, le=100)

    midpiece_defects_percent: float = Field(ge=0, le=100)

    tail_defects_percent: float = Field(ge=0, le=100)
    
    pin_heads_percent: float = Field(ge=0, le=100)

    live_sperm_percent: float = Field(ge=0, le=100)

    dead_sperm_percent: float = Field(ge=0, le=100)

    fructose: str = Field(min_length=1, max_length=20)

    aggregation_agglutination: str = Field(
        min_length=1,
        max_length=20,
    )

    comments: str | None = None



class MorphologyUpdate(BaseModel):
    normal_forms_percent: float | None = Field(default=None, ge=0, le=100)

    head_defects_percent: float | None = Field(default=None, ge=0, le=100)

    midpiece_defects_percent: float | None = Field(default=None, ge=0, le=100)

    tail_defects_percent: float | None = Field(default=None, ge=0, le=100)
    
    pin_heads_percent: float | None = Field(
        default=None,
        ge=0,
        le=100,
    )

    live_sperm_percent: float | None = Field(
        default=None,
        ge=0,
        le=100,
    )

    dead_sperm_percent: float | None = Field(
        default=None,
        ge=0,
        le=100,
    )

    fructose: str | None = Field(
        default=None,
        min_length=1,
        max_length=20,
    )

    aggregation_agglutination: str | None = Field(
        default=None,
        min_length=1,
        max_length=20,
    )

    comments: str | None = None
    


class MorphologyResponse(BaseModel):
    id: int

    sample_code: str

    normal_forms_percent: float

    head_defects_percent: float

    midpiece_defects_percent: float

    tail_defects_percent: float
    
    pin_heads_percent: float

    live_sperm_percent: float
    
    dead_sperm_percent: float
    
    fructose: str
    
    aggregation_agglutination: str
    
    comments: str | None
    
    model_config = {
        "from_attributes": True,
    }