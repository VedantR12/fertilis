from pydantic import BaseModel, ConfigDict


class PaginationMeta(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int
    has_next: bool
    has_previous: bool

    model_config = ConfigDict(from_attributes=True)