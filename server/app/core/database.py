from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models.base import Base

# Import all models so Base.metadata is populated
from app.models.user import User
from app.models.patient import Patient
from app.models.sample import Sample
from app.models.morphology import Morphology
from app.models.dfi import DFI

from app.core.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()