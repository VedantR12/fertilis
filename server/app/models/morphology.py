from typing import TYPE_CHECKING

from sqlalchemy import Float, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.sample import Sample


class Morphology(Base, TimestampMixin):
    __tablename__ = "morphologies"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    sample_id: Mapped[int] = mapped_column(
        ForeignKey("samples.id"),
        unique=True,
        nullable=False,
    )

    normal_forms_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    head_defects_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    midpiece_defects_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    tail_defects_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    pin_heads_percent: Mapped[float] = mapped_column(
    Float,
    nullable=False,
    )
    
    live_sperm_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )
    
    dead_sperm_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )
    
    fructose: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    
    aggregation_agglutination: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )
    
    comments: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    sample: Mapped["Sample"] = relationship(
        "Sample",
        back_populates="morphology",
    )

    @property
    def sample_code(self) -> str:
        return self.sample.sample_code
    