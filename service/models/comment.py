from .base import Base, BaseModel
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

class Comment(Base, BaseModel):
    __tablename__ = 'comments'
    created_at = Column(DateTime)
    description = Column(String(255)) # Maybe allow longer comments than this?
    goal_id = Column(Integer, ForeignKey("goals.id")) # Foreign Key
    employee_id = Column(Integer) # Foreign Key (Track author of comment)
