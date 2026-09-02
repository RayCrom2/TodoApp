from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import tasks

app = FastAPI(title="TodoApp API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(tasks.router)
