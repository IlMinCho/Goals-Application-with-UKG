from datetime import datetime
from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import get_db

import models
import schemas

employees_router = APIRouter()

@employees_router.get("/employees", response_model=List[schemas.Employee])
async def get_employees(sess: Session=Depends(get_db)):
    return sess.query(models.Employee).all()

@employees_router.get("/employees/{id}", response_model=schemas.Employee)
async def get_employee(id: str, sess: Session=Depends(get_db)):
    split_id = id.split("_")
    if (split_id[0] == "None"):
        raise HTTPException(404, detail=f"Employee id given = None")
    employee = sess.query(models.Employee).filter(models.Employee.employee_id_company_id == id).first()
    if employee:
        return employee
    else:
        raise HTTPException(404, detail=f"Employee with id {split_id[0]} in company {split_id[1]} not found")



@employees_router.get("/employees/{id}/managed-employees", response_model=List[schemas.Employee])
async def get_managed_employees_of_manager(id: str, sess: Session=Depends(get_db)):
    return sess.query(models.Employee).filter(models.Employee.manager_id == id).all()

@employees_router.post("/employees", response_model=schemas.Employee)
async def post_employee(credentials: schemas.Employee, sess: Session=Depends(get_db)):
    test_employee = models.Employee(
                first_name = credentials.first_name,
                last_name = credentials.last_name,
                employee_id = credentials.employee_id,
                email = credentials.email,
                company_id = credentials.company_id,
                company_name = credentials.company_name,
                position_title = credentials.position_title,
                current = credentials.current,
                manager_id = credentials.manager_id,
                password = credentials.password
                )
    sess.add(test_employee)
    sess.commit()
    sess.refresh(test_employee)
    return test_employee

@employees_router.get("/demo/employees", response_model=schemas.Employee)
async def seed_test_employee(sess: Session=Depends(get_db)):
    test_employee = models.Employee( first_name="Saakshaat",
                last_name="Singh",
                employee_id = 55441,
                email="saakshaatsin@umass.edu",
                company_id=2,
                company_name="UKG",
                position_title="Test User",
                current = True,
                manager_id=1,
                password="easypeesylemonsqueezy"
                )
    sess.add(test_employee)
    sess.commit()

    sess.refresh(test_employee) # to add id and DB metadata to test_employee for use in response
    return test_employee

