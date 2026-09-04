import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_session
from ..models import Task
from ..schemas import TaskCreate, TaskRead, TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("", response_model=list[TaskRead])
async def list_tasks(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Task).order_by(Task.created_at))
    return result.scalars().all()


@router.post("", response_model=TaskRead, status_code=201)
async def create_task(payload: TaskCreate, session: AsyncSession = Depends(get_session)):
    task = Task(title=payload.title, due_on=payload.due_on, time_due=payload.time_due)
    session.add(task)
    await session.commit()
    await session.refresh(task)
    return task


@router.patch("/{task_id}", response_model=TaskRead)
async def update_task_completed(
    task_id: uuid.UUID, payload: TaskUpdate, session: AsyncSession = Depends(get_session)
):
    task = await session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    task.completed = payload.completed
    await session.commit()
    await session.refresh(task)
    return task


@router.delete("/{task_id}", status_code=204)
async def delete_task(task_id: uuid.UUID, session: AsyncSession = Depends(get_session)):
    task = await session.get(Task, task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    await session.delete(task)
    await session.commit()
