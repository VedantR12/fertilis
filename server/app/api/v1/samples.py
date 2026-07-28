from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_reception
from app.models.user import User
from app.schemas.sample import (
    SampleCreate,
    SampleUpdate,
    SampleResponse,
)
from app.services.sample import SampleService

router = APIRouter(
    prefix="/samples",
    tags=["Samples"],
)


@router.post(
    "",
    response_model=SampleResponse,
)
def create_sample(
    data: SampleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return SampleService.create_sample(db, data)


@router.get(
    "",
    response_model=List[SampleResponse],
)
def get_samples(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return SampleService.get_samples(db)


@router.get(
    "/{sample_code}",
    response_model=SampleResponse,
)
def get_sample(
    sample_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return SampleService.get_sample(db, sample_code)


@router.patch(
    "/{sample_code}",
    response_model=SampleResponse,
)
def update_sample(
    sample_code: str,
    data: SampleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return SampleService.update_sample(
        db,
        sample_code,
        data,
    )