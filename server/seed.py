from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.core.security import hash_password
from app.models.user import User
from app.models.enums import UserRole

db: Session = SessionLocal()

existing = (
    db.query(User)
      .filter(User.username == "admin")
      .first()
)

if not existing:
    admin = User(
        username="admin",
        full_name="System Administrator",
        password_hash=hash_password("admin123"),
        role=UserRole.ADMIN,
        is_active=True,
    )

    db.add(admin)
    db.commit()

    print("Admin user created")

else:
    print("Admin already exists")

db.close()