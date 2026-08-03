from pydantic import BaseModel, Field, computed_field
from datetime import datetime

class SemenAnalysisBase(BaseModel):
    

    criteria: str = Field(min_length=1, max_length=30)

    

    volume_ml: float = Field(ge=0)
    appearance: str = Field(min_length=1, max_length=30)
    ph: float = Field(ge=0, le=14)
    viscosity: str = Field(min_length=1, max_length=30)
    liquefaction_minutes: int = Field(ge=0)


    sperm_concentration_million_ml: float = Field(ge=0)
    wbc_concentration_million_ml: float = Field(ge=0)

    pus_cells: str = Field(min_length=1, max_length=20)
    debris: str = Field(min_length=1, max_length=20)
    agglutination: str = Field(min_length=1, max_length=20)


    total_motility_percent: float = Field(ge=0, le=100)
    progressive_motility_percent: float = Field(ge=0, le=100)
    rapid_progressive_percent: float = Field(ge=0, le=100)
    slow_progressive_percent: float = Field(ge=0, le=100)
    non_progressive_percent: float = Field(ge=0, le=100)
    immotile_percent: float = Field(ge=0, le=100)


    morphology_normal_percent: float | None = Field(
        default=None,
        ge=0,
        le=100,
    )

    morphology_abnormal_percent: float | None = Field(
        default=None,
        ge=0,
        le=100,
    )


    comments: str | None = None


class SemenAnalysisCreate(SemenAnalysisBase):
    sample_code: str


class SemenAnalysisUpdate(SemenAnalysisBase):
    pass


class SemenAnalysisResponse(SemenAnalysisBase):
    id: int
    sample_code: str
    created_at: datetime

    @computed_field
    @property
    def total_sperm_million(self) -> float:
        return round(
            self.volume_ml * self.sperm_concentration_million_ml,
            2,
        )

    @computed_field
    @property
    def total_motile_sperm_million(self) -> float:
        return round(
            self.total_sperm_million
            * self.total_motility_percent
            / 100,
            2,
        )

    @computed_field
    @property
    def progressive_motile_sperm_million(self) -> float:
        return round(
            self.total_sperm_million
            * self.progressive_motility_percent
            / 100,
            2,
        )

    @computed_field
    @property
    def morphologically_normal_sperm_million(self) -> float | None:

        if self.morphology_normal_percent is None:
            return None

        return round(
            self.total_sperm_million
            * self.morphology_normal_percent
            / 100,
            2,
        )

    model_config = {
        "from_attributes": True,
    }