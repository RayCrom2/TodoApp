import uuid
from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str
    due_on: date | None = None


class TaskUpdate(BaseModel):
    completed: bool


class TaskRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    completed: bool
    created_at: datetime
    due_on: date | None = None
