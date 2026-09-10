"""rename due_on to date_due

Revision ID: 0003
Revises: 0002
Create Date: 2026-09-04

"""
from typing import Sequence, Union

from alembic import op

revision: str = "0003"
down_revision: Union[str, None] = "0002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.alter_column("tasks", "due_on", new_column_name="date_due")


def downgrade() -> None:
    op.alter_column("tasks", "date_due", new_column_name="due_on")
