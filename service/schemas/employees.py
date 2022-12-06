from datetime import date, datetime
from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from .goals import Goal

class Employee(BaseModel):
    id: Optional[int]
    first_name: str
    last_name: str
    employee_id: str
    email: str #TODO: add validator for email regex
    company_id: str
    company_name: str
    position_title: str
    current: bool = True
    password: str = ''
    created_at: datetime
    goals: List[Goal] = []
    manager_id: str = None

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON

class EmployeeWithReports(Employee):
    reports: List[Employee] = []
