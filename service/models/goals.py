import enum

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base, BaseModel

class GoalStatus(str, enum.Enum):
    to_do = 'Not-Started'
    in_progress = 'In-Progress'
    done = 'Done'
    missed = 'Missed'
    archived = 'Archived'

class Goal(Base, BaseModel):
    __tablename__ = 'goals'
    title = Column(String(50))
    description = Column(String(255))
    assignee_id = Column(Integer, ForeignKey("employees.id"))
    assignee = relationship("Employee", back_populates="goals")
    status = Column(Enum(GoalStatus))
    comments = relationship("Comment")
    start_date = Column(DateTime)    
    end_date = Column(DateTime)
    created_by = Column(Integer)
    created_at = Column(DateTime)