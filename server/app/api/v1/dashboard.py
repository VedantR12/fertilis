from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import require_admin

from app.models.patient import Patient
from app.models.sample import Sample
from app.models.user import User

from app.schemas.dashboard import DashboardStatsResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get(
    "/stats",
    response_model=DashboardStatsResponse,
)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    return DashboardStatsResponse(
        total_patients=db.query(Patient).count(),
        total_samples=db.query(Sample).count(),
    )