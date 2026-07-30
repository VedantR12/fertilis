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

    dfi_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    hds_percent: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    method: Mapped[str] = mapped_column(
        String(50),
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