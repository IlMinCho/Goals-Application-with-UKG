import enum
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from .base import Base, BaseModel

class GoalStatus(enum.Enum):
    to_do = 1
    in_progress = 2
    completed = 3

class Goal(Base, BaseModel):
    __tablename__ = 'goals'
    title = Column(String(50))
    description = Column(String(255))
    assignee_id = Column(Integer)
    status = Column(Enum(GoalStatus))
    start_date = Column(DateTime)    
    end_date = Column(DateTime, nullable=True)
