from sqlalchemy import Float, ForeignKey, Integer, String, Text
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

    # -------------------------
    # General
    # -------------------------

    criteria: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    # -------------------------
    # Macroscopic Examination
    # -------------------------

    volume_ml: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    appearance: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    ph: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    viscosity: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    liquefaction_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # -------------------------
    # Microscopic Examination
    # -------------------------

    sperm_concentration_million_ml: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    wbc_concentration_million_ml: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    pus_cells: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    debris: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    agglutination: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # -------------------------
    # Motility
    # -------------------------

    total_motility_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    progressive_motility_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    rapid_progressive_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    slow_progressive_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    non_progressive_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    immotile_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    # -------------------------
    # Morphology
    # -------------------------

    morphology_normal_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    morphology_abnormal_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    # -------------------------
    # Comments
    # -------------------------

    comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    sample: Mapped["Sample"] = relationship(
        "Sample",
        back_populates="analysis",
    )

    @property
    def sample_code(self) -> str:
        return self.sample.sample_code