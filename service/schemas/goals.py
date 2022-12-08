from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

from models import GoalStatus

from .comments import Comment

class Goal(BaseModel):
    title: str
    description: str
    assignee_id: int
    status: GoalStatus
    start_date: datetime
    end_date: Optional[datetime]
    created_by: int

class GoalGet(Goal):
    id: int
    comments: List[Comment] = []
    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON
