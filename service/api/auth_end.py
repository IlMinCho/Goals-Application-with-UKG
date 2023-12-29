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

auth_router = APIRouter()

@auth_router.post("/auth", response_model=schemas.Employee)
async def authentication(credentials: schemas.AuthPost, sess: Session=Depends(get_db)):
    auth = sess.query(models.Employee).filter(models.Employee.email == credentials.username, models.Employee.password == credentials.password).first()
    if auth:
        return auth
    else:
        raise HTTPException(404, detail=f"Username, password doesn't match!")

@auth_router.get("/demo/auth", response_model= List[schemas.AuthEnd])
async def authentication_demo(sess: Session=Depends(get_db)):
    test1 = models.AuthEnd(username = "johndoe@ukg.com", password = "notsafe", employee_ref = 1)
    test2 = models.AuthEnd(username = "jen@ukg.com", password = "notsafeagain", employee_ref = 2)
    test3 = models.AuthEnd(username = "josephdoing@ukg.com", password = "notreallysafe", employee_ref = 3)
    sess.add(test1)
    sess.add(test2)
    sess.add(test3)
    sess.commit()

    sess.refresh(test1) # to add id and DB metadata to test_employee for use in response
    sess.refresh(test2)
    sess.refresh(test3)
    return [test1, test2, test3]
