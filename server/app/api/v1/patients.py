from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.dependencies import get_db, require_reception
from app.models.user import User
from app.schemas.patient import PatientCreate, PatientUpdate, PatientResponse
from app.services.patient import PatientService

router = APIRouter(prefix="/patients", tags=["Patients"])


@router.post(
    "",
    response_model=PatientResponse,
)
def create_patient(
    data: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return PatientService.create_patient(db, data)

@router.get(
    "",
    response_model=List[PatientResponse],
)
def get_patients(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return PatientService.get_patients(db)

@router.get(
    "/{patient_code}",
    response_model=PatientResponse,
)
def get_patient(
    patient_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return PatientService.get_patient(db, patient_code)

@router.put(
    "/{patient_code}",
    response_model=PatientResponse,
)
def update_patient(
    patient_code: str,
    data: PatientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return PatientService.update_patient(
        db,
        patient_code,
        data,
    )