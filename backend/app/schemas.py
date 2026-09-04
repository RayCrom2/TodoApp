import uuid
from datetime import date, datetime, time

from pydantic import BaseModel, ConfigDict, Field


class TaskCreate(BaseModel):
    title: str
    due_on: date = Field(default_factory=date.today)
    time_due: time = Field(default_factory=lambda: time(23, 59, 59))


class TaskUpdate(BaseModel):
    completed: bool


class TaskRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    completed: bool
    created_at: datetime
    due_on: date 
    time_due: time
