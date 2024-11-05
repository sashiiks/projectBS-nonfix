"""Add AdminUser table for admin registration

Revision ID: 86de8a11b5e6
Revises: 0b5bda9cbea3
Create Date: 2024-10-28 10:26:48.316615

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '86de8a11b5e6'
down_revision: Union[str, None] = '0b5bda9cbea3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_bank_sampah_report_id', table_name='bank_sampah_report')
    op.drop_table('bank_sampah_report')
    op.drop_index('ix_bank_sampah_registration_id', table_name='bank_sampah_registration')
    op.drop_table('bank_sampah_registration')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bank_sampah_registration',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('desa_kelurahan', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('nama_bank_sampah', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('rt', sa.VARCHAR(length=5), autoincrement=False, nullable=True),
    sa.Column('rw', sa.VARCHAR(length=5), autoincrement=False, nullable=True),
    sa.Column('tanggal_pendaftaran', sa.DATE(), autoincrement=False, nullable=False),
    sa.Column('nama_pengepul', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='bank_sampah_registration_pkey')
    )
    op.create_index('ix_bank_sampah_registration_id', 'bank_sampah_registration', ['id'], unique=False)
    op.create_table('bank_sampah_report',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('desa_kelurahan', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('nama_bank_sampah', sa.VARCHAR(length=100), autoincrement=False, nullable=False),
    sa.Column('rt', sa.VARCHAR(length=5), autoincrement=False, nullable=True),
    sa.Column('rw', sa.VARCHAR(length=5), autoincrement=False, nullable=True),
    sa.Column('jumlah_nasabah', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('nasabah_aktif', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('pembelian_kg', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('jumlah_pembelian_rp', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('penjualan_kg', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('jumlah_penjualan_rp', sa.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=False),
    sa.Column('nama_pengepul', sa.VARCHAR(length=100), autoincrement=False, nullable=True),
    sa.Column('tanggal', sa.DATE(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('id', name='bank_sampah_report_pkey')
    )
    op.create_index('ix_bank_sampah_report_id', 'bank_sampah_report', ['id'], unique=False)
    # ### end Alembic commands ###
