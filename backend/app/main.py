# import asyncio
# from contextlib import asynccontextmanager


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import tasks
# from .scheduler import run_periodic_query

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     task = asyncio.create_task(run_periodic_query())
#     yield
#     task.cancel()

app = FastAPI(title="TodoApp API" ''', lifespan=lifespan''')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(tasks.router)
