from sqlalchemy.orm import Session
from sqlalchemy import or_
from fastapi import HTTPException
from app.models.patient import Patient
from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientListResponse,
)
from app.utils.patient_code import generate_patient_code
from math import ceil


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
    def get_patients(
        db: Session,
        search: str | None = None,
        doctor: str | None = None,
        page: int = 1,
        limit: int = 20,
    ) -> PatientListResponse:
        query = db.query(Patient)

        if search:
            query = query.filter(
                or_(
                    Patient.patient_code.ilike(f"%{search}%"),
                    Patient.first_name.ilike(f"%{search}%"),
                    Patient.last_name.ilike(f"%{search}%"),
                    Patient.phone.ilike(f"%{search}%"),
                    Patient.doctor.ilike(f"%{search}%"),
                )
            )
            
        if doctor:
            query = query.filter(
                Patient.doctor.ilike(doctor)
            )
        
        total = query.count()
        
        patients = (
            query
            .order_by(Patient.created_at.desc())
            .offset((page - 1) * limit)
            .limit(limit)
            .all()
        )

        total_pages = ceil(total / limit) if total > 0 else 1

        return {
            "items": patients,
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