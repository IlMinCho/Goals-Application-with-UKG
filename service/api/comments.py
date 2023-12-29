from datetime import datetime
from typing import List
from random import randint

from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from . import get_db

import models
import schemas

comments_router = APIRouter()

# Endpoint to get all comments
# Might not be super useful for the frontend, but currently it assists testing
@comments_router.get("/comments", response_model=List[schemas.Comment])
async def get_comments(sess: Session=Depends(get_db)):
    return sess.query(models.Comment).all()

# Endpoint to create a comment
@comments_router.post("/comments", status_code=201, response_model=schemas.Comment)
async def post_comment(item: schemas.Comment, Session = Depends(get_db)):
    new_comment = models.Comment(
        description=item.description,
        goal_id=item.goal_id,
        employee_id=item.employee_id
    )

    Session.add(new_comment)
    Session.commit()

    Session.refresh(new_comment) # to add id and DB metadata to new_comment for use in response
    return new_comment

# Endpoint to get a specific comment based on comment id
@comments_router.get("/comments/{id}", response_model=schemas.Comment)
async def get_comment(id: int, sess: Session=Depends(get_db)):
    comment = sess.query(models.Comment).get(id)
    if comment:
        return comment
    else:
        raise HTTPException(404, detail=f"Comment with id {id} not found")

# Endpoint to get all comments for a goal based on goal id
@comments_router.get("/goals/{id}/comments", response_model=List[schemas.Comment])
async def get_comments_of_goal(id: int, sess: Session=Depends(get_db)):
    comment = sess.query(models.Comment).filter(models.Comment.goal_id == id).all()
    if comment:
        return comment
    else:
        raise HTTPException(404, detail=f"No comments found for goal id {id}")

# Demo endpoint to seed a test comment
@comments_router.get("/demo/comments", response_model=schemas.Comment)
async def seed_test_comment(sess: Session=Depends(get_db)):
    test_comment = models.Comment(
        description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce porta magna non egestas sollicitudin. Maecenas ipsum nisl, imperdiet placerat condimentum.",
        goal_id = randint(0,20),
        employee_id = randint(0,20)
    )

    sess.add(test_comment)
    sess.commit()

    sess.refresh(test_comment) # to add id and DB metadata to test_comment for use in response
    return test_comment

