from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_reception
from app.models.user import User
from app.schemas.sample import (
    SampleCreate,
    SampleUpdate,
    SampleResponse,
    SampleListResponse,
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
    response_model=SampleListResponse,
)
def get_samples(
    search: str | None = Query(default=None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_reception),
):
    return SampleService.get_samples(
        db=db,
        search=search,
        page=page,
        limit=limit,
    )


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