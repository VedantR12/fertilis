from datetime import datetime


def generate_sample_code(sample_id: int) -> str:
    year = datetime.now().strftime("%y")
    return f"S{year}{sample_id:06d}"