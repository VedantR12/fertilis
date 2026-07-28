from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate
from app.utils.patient_code import generate_patient_code


class PatientService:

    @staticmethod
    def create_patient(db: Session, data: PatientCreate) -> Patient:
        patient = Patient(
            first_name=data.first_name,
            last_name=data.last_name,
            age=data.age,
            phone=data.phone,
            doctor=data.doctor,
        )

        db.add(patient)
        db.flush()

        patient.patient_code = generate_patient_code(patient.id)

        db.commit()
        db.refresh(patient)

        return patient

    @staticmethod
    def get_patients(db: Session):
        return (
            db.query(Patient)
            .order_by(Patient.created_at.desc())
            .all()
        )
    
    @staticmethod
    def get_patient(db: Session, patient_code: str) -> Patient:
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

        return patient
    
    @staticmethod
    def update_patient(
        db: Session,
        patient_code: str,
        data: PatientUpdate,
    ) -> Patient:

        patient = PatientService.get_patient(db, patient_code)

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(patient, key, value)

        db.commit()
        db.refresh(patient)

        return patient