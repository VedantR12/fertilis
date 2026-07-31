from sqlalchemy.orm import Session
from sqlalchemy import or_
from datetime import date, timedelta
from fastapi import HTTPException
from math import ceil
from app.models.sample import Sample
from app.models.patient import Patient
from app.models.semen_analysis import SemenAnalysis
from app.models.morphology import Morphology
from app.models.dfi import DFI
from app.schemas.sample import (
    SampleCreate,
    SampleUpdate,
    SampleListResponse,
)
from app.utils.sample_code import generate_sample_code


class SampleService:

    @staticmethod
    def create_sample(
        db: Session,
        data: SampleCreate,
    ) -> Sample:

        patient = (
            db.query(Patient)
            .filter(Patient.patient_code == data.patient_code)
            .first()
        )

        if not patient:
            raise HTTPException(
                status_code=404,
                detail="Patient not found",
            )

        sample = Sample(
            patient_id=patient.id,
            sample_type=data.sample_type,
            collection_datetime=data.collection_datetime,
            abstinence_days=data.abstinence_days,
            collection_method=data.collection_method,
            collection_place=data.collection_place,
            remarks=data.remarks,
        )

        db.add(sample)
        db.flush()

        sample.sample_code = generate_sample_code(sample.id)

        db.commit()
        db.refresh(sample)

        return sample
    
    @staticmethod
    def get_samples(
        db: Session,
        search: str | None = None,
        sample_type: str | None = None,
        status: str | None = None,
        from_date: date | None = None,
        to_date: date | None = None,
        page: int = 1,
        limit: int = 20,
    ) -> SampleListResponse:

        query = (
            db.query(Sample)
            .join(Patient)
        )

        if search:
            query = query.filter(
                or_(
                    Sample.sample_code.ilike(f"%{search}%"),
                    Sample.sample_type.ilike(f"%{search}%"),
                    Patient.patient_code.ilike(f"%{search}%"),
                    Patient.first_name.ilike(f"%{search}%"),
                    Patient.last_name.ilike(f"%{search}%"),
                )
            )
            
        if sample_type:
            query = query.filter(
                Sample.sample_type.ilike(sample_type)
            )

        if status:
            query = query.filter(
                Sample.status.ilike(status)
            )

        if from_date:
            query = query.filter(
                Sample.collection_datetime >= from_date
            )

        if to_date:
            query = query.filter(
                Sample.collection_datetime < (to_date + timedelta(days=1))
            )

        total = query.count()

        samples = (
            query
            .order_by(Sample.created_at.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        total_pages = ceil(total / limit) if total > 0 else 1

        return {
            "items": samples,
            "pagination": {
                "page": page,
                "limit": limit,
                "total": total,
                "total_pages": total_pages,
                "has_next": page < total_pages,
                "has_previous": page > 1,
            },
        }
        
    @staticmethod
    def get_sample(
        db: Session,
        sample_code: str,
    ) -> Sample:

        sample = (
            db.query(Sample)
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not sample:
            raise HTTPException(
                status_code=404,
                detail="Sample not found",
            )

        return sample
    
    @staticmethod
    def update_sample(
        db: Session,
        sample_code: str,
        data: SampleUpdate,
    ) -> Sample:

        sample = SampleService.get_sample(
            db,
            sample_code,
        )

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(sample, key, value)

        db.commit()
        db.refresh(sample)

        return sample
    
    @staticmethod
    def get_patient_samples(
        db: Session,
        patient_code: str,
    ) -> list[Sample]:

        patient = (
            db.query(Patient)
            .filter(Patient.patient_code == patient_code)
            .first()
        )

        if not patient:
            raise HTTPException(
                status_code=404,
                detail="Patient not found",
            )

        return (
            db.query(Sample)
            .filter(Sample.patient_id == patient.id)
            .order_by(Sample.collection_datetime.desc())
            .all()
        )
    
    @staticmethod
    def get_sample_tests(
        db: Session,
        sample_code: str,
    ):

        sample = SampleService.get_sample(
            db,
            sample_code,
        )

        semen_exists = (
            db.query(SemenAnalysis)
            .filter(SemenAnalysis.sample_id == sample.id)
            .first()
            is not None
        )

        morphology_exists = (
            db.query(Morphology)
            .filter(Morphology.sample_id == sample.id)
            .first()
            is not None
        )

        dfi_exists = (
            db.query(DFI)
            .filter(DFI.sample_id == sample.id)
            .first()
            is not None
        )

        return {
            "sample_code": sample.sample_code,
            "tests": [
                {
                    "id": "semen-analysis",
                    "name": "Semen Analysis",
                    "performed": semen_exists,
                },
                {
                    "id": "morphology",
                    "name": "Morphology",
                    "performed": morphology_exists,
                },
                {
                    "id": "dfi",
                    "name": "DNA Fragmentation Index",
                    "performed": dfi_exists,
                },
            ],
        }