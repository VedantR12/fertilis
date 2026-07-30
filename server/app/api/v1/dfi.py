from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_reception

from app.schemas.dfi import (
    DFICreate,
    DFIUpdate,
    DFIResponse,
)

from app.services.dfi import DFIService

router = APIRouter(
    prefix="/dfis",
    tags=["DFI"],
)


@router.post(
    "",
    response_model=DFIResponse,
)
def create_dfi(
    data: DFICreate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return DFIService.create_dfi(db, data)


@router.get(
    "",
    response_model=list[DFIResponse],
)
def get_dfis(
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return DFIService.get_dfis(db)


@router.get(
    "/{sample_code}",
    response_model=DFIResponse,
)
def get_dfi(
    sample_code: str,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return DFIService.get_dfi(
        db,
        sample_code,
    )


@router.patch(
    "/{sample_code}",
    response_model=DFIResponse,
)
def update_dfi(
    sample_code: str,
    data: DFIUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return DFIService.update_dfi(
        db,
        sample_code,
        data,
    )