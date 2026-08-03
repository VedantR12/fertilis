from typing import TYPE_CHECKING

from sqlalchemy import Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base, TimestampMixin

if TYPE_CHECKING:
    from app.models.sample import Sample


class DFI(Base, TimestampMixin):
    __tablename__ = "dfis"

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

    liquefaction_minutes: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    viscosity: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
    )

    ph: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    sperm_concentration_raw: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    non_fragmented_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    fragmented_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    large_halo_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    medium_halo_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    small_halo_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    no_halo_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    degraded_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    remarks: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    sample: Mapped["Sample"] = relationship(
        "Sample",
        back_populates="dfi",
    )

    @property
    def sample_code(self) -> str:
        return self.sample.sample_code