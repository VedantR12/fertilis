from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import DateTime, ForeignKey, Integer, String, Text
from app.models.base import Base, TimestampMixin

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.patient import Patient
    from app.models.semen_analysis import SemenAnalysis
    from app.models.morphology import Morphology
    from app.models.dfi import DFI

class Sample(Base, TimestampMixin):
    __tablename__ = "samples"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)

    sample_code: Mapped[str | None] = mapped_column(
        String(20),
        unique=True,
        index=True,
        nullable=True,
    )

    patient_id: Mapped[int] = mapped_column(
        ForeignKey("patients.id"),
        nullable=False,
    )

    sample_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
    )

    collection_datetime: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
    )

    abstinence_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    
    collection_method: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    collection_place: Mapped[str | None] = mapped_column(
        String(50),
        nullable=True,
    )

    remarks: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    status: Mapped[str] = mapped_column(
        String(30),
        default="Collected",
    )

    patient: Mapped["Patient"] = relationship(
    "Patient",
    back_populates="samples",
    )
    
    analysis: Mapped["SemenAnalysis"] = relationship(
    "SemenAnalysis",
    back_populates="sample",
    cascade="all, delete-orphan",
    uselist=False,
    )
    
    morphology: Mapped["Morphology"] = relationship(
    "Morphology",
    back_populates="sample",
    cascade="all, delete-orphan",
    uselist=False,
    )
    
    dfi: Mapped["DFI"] = relationship(
    "DFI",
    back_populates="sample",
    cascade="all, delete-orphan",
    uselist=False,
    )
    
    @property
    def patient_code(self) -> str | None:
        return self.patient.patient_code