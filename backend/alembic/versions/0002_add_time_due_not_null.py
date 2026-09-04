"""add time_due column, enforce not-null on due_on and time_due

Revision ID: 0002
Revises: 0001
Create Date: 2026-09-02

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "0002"
down_revision: Union[str, None] = "0001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("tasks", sa.Column("time_due", sa.Time(), nullable=True))
    op.execute("UPDATE tasks SET due_on = created_at::date WHERE due_on IS NULL")
    op.execute("UPDATE tasks SET time_due = '23:59:59' WHERE time_due IS NULL")
    op.alter_column("tasks", "due_on", nullable=False)
    op.alter_column("tasks", "time_due", nullable=False)


def downgrade() -> None:
    op.alter_column("tasks", "due_on", nullable=True)
    op.drop_column("tasks", "time_due")
