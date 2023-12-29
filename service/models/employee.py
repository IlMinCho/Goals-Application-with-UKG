from datetime import datetime
import enum

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base, BaseModel

def get_employee_id_company_id(context):
    params = context.get_current_parameters()
    employee_id = params['employee_id']
    company_id = params['company_id']

    return f"{employee_id}_{company_id}"

class Employee(Base, BaseModel):
    __tablename__ = 'employees'
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(Integer)
    email = Column(String(50))
    company_id = Column(String(50))
    company_name = Column(String(50))
    position_title = Column(String(50))
    current = Column(Boolean)
    password = Column(String(50))
    goals = relationship("Goal", back_populates="assignee")
    manager_id = Column(Integer, ForeignKey("employees.employee_id_company_id"))
    reports = relationship("Employee")
    employee_id_company_id = Column(String, default=get_employee_id_company_id, onupdate=get_employee_id_company_id)
