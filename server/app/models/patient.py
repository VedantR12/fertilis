from typing import TYPE_CHECKING, List
from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import Base, TimestampMixin


if TYPE_CHECKING:
    from app.models.sample import Sample

class Patient(Base, TimestampMixin):
    __tablename__ = "patients"

    id: Mapped[int] = mapped_column(
        primary_key=True,
        index=True,
    )

    patient_code: Mapped[str] = mapped_column(
        String(9),
        unique=True,
        nullable=True,  # Filled after insert
    )

    first_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    last_name: Mapped[str] = mapped_column(
        String(100),
        nullable=True,
    )

    age: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(15),
        nullable=True,
    )

    doctor: Mapped[str] = mapped_column(
        String(150),
        nullable=True,
    )
    
    
    samples: Mapped[List["Sample"]] = relationship(
    "Sample",
    back_populates="patient",
    cascade="all, delete-orphan",
    )