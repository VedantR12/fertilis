from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_reception
from app.schemas.semen_analysis import (
    SemenAnalysisCreate,
    SemenAnalysisUpdate,
    SemenAnalysisResponse,
)
from app.services.semen_analysis import SemenAnalysisService

router = APIRouter(
    prefix="/semen-analyses",
    tags=["Semen Analyses"],
)

@router.post(
    "",
    response_model=SemenAnalysisResponse,
)
def create_analysis(
    data: SemenAnalysisCreate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return SemenAnalysisService.create_analysis(db, data)

@router.get(
    "",
    response_model=list[SemenAnalysisResponse],
)
def get_analyses(
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return SemenAnalysisService.get_analyses(db)

@router.get(
    "/{sample_code}",
    response_model=SemenAnalysisResponse,
)
def get_analysis(
    sample_code: str,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return SemenAnalysisService.get_analysis(
        db,
        sample_code,
    )
    
@router.patch(
    "/{sample_code}",
    response_model=SemenAnalysisResponse,
)
def update_analysis(
    sample_code: str,
    data: SemenAnalysisUpdate,
    db: Session = Depends(get_db),
    _: dict = Depends(require_reception),
):
    return SemenAnalysisService.update_analysis(
        db,
        sample_code,
        data,
    )