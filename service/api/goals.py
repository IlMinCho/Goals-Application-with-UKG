from fastapi import APIRouter

from typing import List

from fastapi import APIRouter, Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import get_db

import models
import schemas
import random
import datetime

goals_router = APIRouter()

@goals_router.get("/employees/{eid}/goals", response_model=List[schemas.Goal])
async def get_goals_of_employee(eid: int, sess: Session=Depends(get_db)):
    goals_list = sess.query(models.Goal).filter(models.Goal.assignee_id == eid).all()
    # goals_list = []
    # for goal in goals:
    #     if goal.assignee_id == eid:
    #         goals_list.append(goal)
    return goals_list

@goals_router.post("/goals", status_code=201)
async def post_goal(item: schemas.Goal, Session = Depends(get_db)):
    SQLitem = models.Goal(
        title=item.title,
        description=item.description,
        assignee_id=item.assignee_id,
        status=item.status,
        start_date=item.start_date,
        end_date = item.end_date,
        created_by = item.created_by
    )
    Session.add(SQLitem)
    Session.commit()
    Session.refresh(SQLitem)
    return SQLitem


@goals_router.put("/goals/{gid}", status_code=200)
async def update_goal(gid: int, item: schemas.Goal, Session = Depends(get_db)):
    goal = Session.query(models.Goal).filter(models.Goal.id == gid).first()
    if goal == None:
        return "Not Found"
    Session.delete(goal)
    Session.commit()
    newGoal = models.Goal(
        id = item.id,
        title=item.title,
        description=item.description,
        assignee_id=item.assignee_id,
        status=item.status,
        start_date=item.start_date,
        end_date = item.end_date
    )
    Session.add(newGoal)
    Session.commit()
    Session.refresh(newGoal)
    return "Done"
