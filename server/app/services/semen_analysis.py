from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException

from app.models.sample import Sample
from app.models.semen_analysis import SemenAnalysis
from app.schemas.semen_analysis import ( 
    SemenAnalysisCreate,
    SemenAnalysisUpdate,
)


class SemenAnalysisService:

    @staticmethod
    def create_analysis(
        db: Session,
        data: SemenAnalysisCreate,
    ) -> SemenAnalysis:

        sample = (
            db.query(Sample)
            .filter(Sample.sample_code == data.sample_code)
            .first()
        )

        if not sample:
            raise HTTPException(
                status_code=404,
                detail="Sample not found",
            )

        existing = (
            db.query(SemenAnalysis)
            .filter(SemenAnalysis.sample_id == sample.id)
            .first()
        )

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Analysis already exists for this sample",
            )

        analysis = SemenAnalysis(
            sample_id=sample.id,

            # General
            criteria=data.criteria,

            # Macroscopic
            volume_ml=data.volume_ml,
            appearance=data.appearance,
            ph=data.ph,
            viscosity=data.viscosity,
            liquefaction_minutes=data.liquefaction_minutes,

            # Microscopic
            sperm_concentration_million_ml=data.sperm_concentration_million_ml,
            wbc_concentration_million_ml=data.wbc_concentration_million_ml,
            pus_cells=data.pus_cells,
            debris=data.debris,
            agglutination=data.agglutination,

            # Motility
            total_motility_percent=data.total_motility_percent,
            progressive_motility_percent=data.progressive_motility_percent,
            rapid_progressive_percent=data.rapid_progressive_percent,
            slow_progressive_percent=data.slow_progressive_percent,
            non_progressive_percent=data.non_progressive_percent,
            immotile_percent=data.immotile_percent,

            # Morphology
            morphology_normal_percent=data.morphology_normal_percent,
            morphology_abnormal_percent=data.morphology_abnormal_percent,

            # Comments
            comments=data.comments,
        )

        db.add(analysis)
        db.commit()
        db.refresh(analysis)

        return analysis
    
    @staticmethod
    def get_analyses(db: Session) -> list[SemenAnalysis]:
        return (
            db.query(SemenAnalysis)
            .options(joinedload(SemenAnalysis.sample))
            .all()
        )
        
    @staticmethod
    def get_analysis(
        db: Session,
        sample_code: str,
    ) -> SemenAnalysis:

        analysis = (
            db.query(SemenAnalysis)
            .join(Sample)
            .options(joinedload(SemenAnalysis.sample))
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not analysis:
            raise HTTPException(
                status_code=404,
                detail="Analysis not found",
            )

        return analysis
    
    @staticmethod
    def update_analysis(
        db: Session,
        sample_code: str,
        data: SemenAnalysisUpdate,
    ) -> SemenAnalysis:

        analysis = (
            db.query(SemenAnalysis)
            .join(Sample)
            .options(joinedload(SemenAnalysis.sample))
            .filter(Sample.sample_code == sample_code)
            .first()
        )

        if not analysis:
            raise HTTPException(
                status_code=404,
                detail="Analysis not found",
            )

        update_data = data.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(analysis, key, value)

        db.commit()
        db.refresh(analysis)

        return analysis
    
    @property
    def sample_code(self) -> str:
        return self.sample.sample_code