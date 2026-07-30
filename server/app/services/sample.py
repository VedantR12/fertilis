from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException
from math import ceil
from app.models.sample import Sample
from app.models.patient import Patient
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