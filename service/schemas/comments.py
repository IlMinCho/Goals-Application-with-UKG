from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Comment(BaseModel):
    id: Optional[int]
    created_at: datetime
    description: str
    goal_id: int
    employee_id: int

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON