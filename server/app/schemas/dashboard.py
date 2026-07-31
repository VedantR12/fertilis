from pydantic import BaseModel


class DashboardStatsResponse(BaseModel):
    total_patients: int
    total_samples: int