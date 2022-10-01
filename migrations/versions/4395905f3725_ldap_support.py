"""LDAP Support

Revision ID: 4395905f3725
Revises: 9ebc039c5b99
Create Date: 2022-09-28 08:55:55.895858

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4395905f3725'
down_revision = '9ebc039c5b99'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('ldap', sa.Boolean(), server_default='0'))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'ldap')
    # ### end Alembic commands ###
