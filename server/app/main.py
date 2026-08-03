from fastapi import FastAPI
from sqlalchemy import text
from app.api.v1 import semen_analysis, morphology, dfi
from app.api.v1 import auth, patients, samples, dashboard
from app.core.database import engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Embrogen API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(patients.router, prefix="/api/v1")
app.include_router(samples.router, prefix="/api/v1")
app.include_router(semen_analysis.router, prefix="/api/v1")
app.include_router(morphology.router, prefix="/api/v1")
app.include_router(dfi.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "Embrogen Backend Running"}


@app.get("/health")
def health():
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

    return {
        "database": "Connected",
        "status": "OK",
    }