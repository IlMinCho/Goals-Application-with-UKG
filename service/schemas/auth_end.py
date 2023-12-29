from pydantic import BaseModel

from .employees import Employee

class AuthPost(BaseModel):
    username: str
    password: str    

class AuthEnd(AuthPost):
    employee_ref: int
    employee: Employee

    class Config:
        orm_mode = True # lets pydantic convert SQLAlchemy object <-> JSON
