from datetime import datetime
import enum

from .base import Base, BaseModel
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum

class Employee(Base, BaseModel):
    __tablename__ = 'Employee'
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(Integer)
    email = Column(String(50))
    company_id = Column(String(50))
    company_name = Column(String(50))
    position_title = Column(String(50))
    current = Column(Boolean)
    manager_id = Column(Integer)
    is_manager = Column(Boolean)
    password = Column(String(50))
