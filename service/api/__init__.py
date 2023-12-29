from fastapi import APIRouter
from sqlalchemy.orm import sessionmaker

from models.base import Base, engine

router = APIRouter()

Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    """
    Get SQLAlchemy database session
    """
    database = SessionLocal()
    try:
        yield database
    finally:
        database.close()

@router.get("/")
async def root():
    return {"message": "Welcome to ByteGoals"}

from .employees import employees_router
from .goals import goals_router
from .comments import comments_router
from .auth_end import auth_router

router.include_router(goals_router)
router.include_router(employees_router)
router.include_router(comments_router)
router.include_router(auth_router)

