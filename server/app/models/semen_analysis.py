from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.sample import Sample


class SemenAnalysis(Base, TimestampMixin):
    __tablename__ = "semen_analyses"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    sample_id: Mapped[int] = mapped_column(
        ForeignKey("samples.id"),
        unique=True,
        nullable=False,
    )

    volume_ml: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    ph: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    concentration_million_ml: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    total_motility_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    progressive_motility_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    morphology_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    vitality_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    wbc_million_ml: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    liquefaction_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    viscosity: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    appearance: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    sample: Mapped["Sample"] = relationship(
        "Sample",
        back_populates="analysis",
    )
    
    @property
    def sample_code(self) -> str:
        return self.sample.sample_code