from datetime import datetime


def generate_patient_code(patient_id: int) -> str:
    year = datetime.now().strftime("%y")
    return f"P{year}{patient_id:06d}"