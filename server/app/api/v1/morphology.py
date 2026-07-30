from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_reception

from app.schemas.morphology import (
    MorphologyCreate,
    MorphologyUpdate,
    MorphologyResponse,
)

from app.services.morphology import MorphologyService

router = APIRouter(
    prefix="/morphologies",
    tags=["Morphologies"],
)


@router.post(
    "",
    response_model=MorphologyResponse,
)
def create_morphology(
    data: MorphologyCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return MorphologyService.create_morphology(
        db,
        data,
    )


@router.get(
    "",
    response_model=list[MorphologyResponse],
)
def get_morphologies(
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return MorphologyService.get_morphologies(db)


@router.get(
    "/{sample_code}",
    response_model=MorphologyResponse,
)
def get_morphology(
    sample_code: str,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return MorphologyService.get_morphology(
        db,
        sample_code,
    )


@router.patch(
    "/{sample_code}",
    response_model=MorphologyResponse,
)
def update_morphology(
    sample_code: str,
    data: MorphologyUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return MorphologyService.update_morphology(
        db,
        sample_code,
        data,
    )