from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException

from app.models.sample import Sample
from app.models.morphology import Morphology
from app.schemas.morphology import (
    MorphologyCreate,
    MorphologyUpdate,
)


class MorphologyService:

    @staticmethod
    def create_morphology(
        db: Session,
        data: MorphologyCreate,
    ) -> Morphology:

        sample = (
            db.query(Sample)
            .filter(Sample.sample_code == data.sample_code)
            .first()
        )

        if not sample:
            raise HTTPException(
                status_code=404,
                detail="Sample not found",
            )

        existing = (
            db.query(Morphology)
            .filter(Morphology.sample_id == sample.id)
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Morphology already exists for this sample",
            )

        morphology = Morphology(
            sample_id=sample.id,
            normal_forms_percent=data.normal_forms_percent,
            head_defects_percent=data.head_defects_percent,
            neck_midpiece_defects_percent=data.neck_midpiece_defects_percent,
            tail_defects_percent=data.tail_defects_percent,
            excess_residual_cytoplasm_percent=data.excess_residual_cytoplasm_percent,
            sperm_evaluated=data.sperm_evaluated,
        )

        db.add(morphology)
        db.commit()
        db.refresh(morphology)

        return morphology

    @staticmethod
    def get_morphologies(
        db: Session,
    ) -> list[Morphology]:

        return (
            db.query(Morphology)
            .options(joinedload(Morphology.sample))
            .all()
        )

    @staticmethod
    def get_morphology(
        db: Session,
        sample_code: str,
    ) -> Morphology:

        morphology = (
            db.query(Morphology)
            .join(Sample)
            .options(joinedload(Morphology.sample))
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not morphology:
            raise HTTPException(
                status_code=404,
                detail="Morphology not found",
            )

        return morphology

    @staticmethod
    def update_morphology(
        db: Session,
        sample_code: str,
        data: MorphologyUpdate,
    ) -> Morphology:

        morphology = (
            db.query(Morphology)
            .join(Sample)
            .options(joinedload(Morphology.sample))
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not morphology:
            raise HTTPException(
                status_code=404,
                detail="Morphology not found",
            )

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(morphology, key, value)

        db.commit()
        db.refresh(morphology)

        return morphology