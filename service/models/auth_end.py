from datetime import datetime
import enum

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base, BaseModel

class AuthEnd(Base, BaseModel):
    __tablename__ = 'Authentication'
    username = Column(String(50))
    password = Column(String(50))
    employee_ref = Column(Integer, ForeignKey("employees.id"))
    employee = relationship("Employee")
