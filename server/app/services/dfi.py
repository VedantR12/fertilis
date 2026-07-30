from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException

from app.models.sample import Sample
from app.models.dfi import DFI
from app.schemas.dfi import (
    DFICreate,
    DFIUpdate,
)


class DFIService:

    @staticmethod
    def create_dfi(
        db: Session,
        data: DFICreate,
    ) -> DFI:

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
            db.query(DFI)
            .filter(DFI.sample_id == sample.id)
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="DFI already exists for this sample",
            )

        dfi = DFI(
            sample_id=sample.id,
            dfi_percent=data.dfi_percent,
            hds_percent=data.hds_percent,
            method=data.method,
            remarks=data.remarks,
        )

        db.add(dfi)
        db.commit()
        db.refresh(dfi)

        return dfi

    @staticmethod
    def get_dfis(
        db: Session,
    ) -> list[DFI]:

        return (
            db.query(DFI)
            .options(joinedload(DFI.sample))
            .all()
        )

    @staticmethod
    def get_dfi(
        db: Session,
        sample_code: str,
    ) -> DFI:

        dfi = (
            db.query(DFI)
            .join(Sample)
            .options(joinedload(DFI.sample))
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not dfi:
            raise HTTPException(
                status_code=404,
                detail="DFI not found",
            )

        return dfi

    @staticmethod
    def update_dfi(
        db: Session,
        sample_code: str,
        data: DFIUpdate,
    ) -> DFI:

        dfi = (
            db.query(DFI)
            .join(Sample)
            .options(joinedload(DFI.sample))
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not dfi:
            raise HTTPException(
                status_code=404,
                detail="DFI not found",
            )

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(dfi, key, value)

        db.commit()
        db.refresh(dfi)

        return dfi