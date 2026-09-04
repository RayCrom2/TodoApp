# backend/app/scheduler.py
# import asyncio

# from .models import Task
# from .database import AsyncSessionLocal
# from sqlalchemy import delete


# async def run_periodic_query():
#     while True:
#         await asyncio.sleep(30)
#         async with AsyncSessionLocal() as session:
#             await session.execute(delete(Task))
#             await session.commit()