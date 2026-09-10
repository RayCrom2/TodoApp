import uuid
from datetime import datetime

from pydantic import AwareDatetime, BaseModel, ConfigDict, Field


class TaskCreate(BaseModel):
    title: str
    start_at: AwareDatetime | None = None
    end_at: AwareDatetime

class TaskUpdate(BaseModel):
    completed: bool


class TaskRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    title: str
    completed: bool
    created_at: datetime
    start_at: datetime | None = None
    end_at: datetime
    
