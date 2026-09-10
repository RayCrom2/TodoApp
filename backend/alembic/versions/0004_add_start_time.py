"""add optional time_start to tasks

Revision ID: 0004
Revises: 0003
Create Date: 2026-09-04

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0004"
down_revision: Union[str, None] = "0003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("tasks", sa.Column("time_start", sa.Time(), nullable=True))


def downgrade() -> None:
    op.drop_column("tasks", "time_start")
