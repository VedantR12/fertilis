from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models.sample import Sample
from app.models.patient import Patient
from app.schemas.sample import SampleCreate, SampleUpdate
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
    def get_samples(db: Session):
        return (
            db.query(Sample)
            .order_by(Sample.created_at.desc())
            .all()
        )
        
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