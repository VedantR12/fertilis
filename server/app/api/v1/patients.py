from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_admin

from app.models.user import User

from app.schemas.patient import (
    PatientCreate,
    PatientUpdate,
    PatientResponse,
    PatientListResponse,
)

from app.services.patient import PatientService
from app.schemas.sample import SampleResponse
from app.services.sample import SampleService

router = APIRouter(
    prefix="/patients",
    tags=["Patients"],
)


@router.post(
    "",
    response_model=PatientResponse,
)
def create_patient(
    data: PatientCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return PatientService.create_patient(db, data)


@router.get(
    "",
    response_model=PatientListResponse,
)
def get_patients(
    search: str | None = Query(default=None),
    doctor: str | None = Query(default=None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return PatientService.get_patients(
        db=db,
        search=search,
        doctor=doctor,
        page=page,
        limit=limit,
    )


@router.get(
    "/{patient_code}",
    response_model=PatientResponse,
)
def get_patient(
    patient_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return PatientService.get_patient(
        db,
        patient_code,
    )


@router.put(
    "/{patient_code}",
    response_model=PatientResponse,
)
def update_patient(
    patient_code: str,
    data: PatientUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return PatientService.update_patient(
        db,
        patient_code,
        data,
    )
    
@router.get(
    "/{patient_code}/samples",
    response_model=list[SampleResponse],
)
def get_patient_samples(
    patient_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return SampleService.get_patient_samples(
        db,
        patient_code,
    )