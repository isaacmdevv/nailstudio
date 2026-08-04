from alembic import op
import sqlalchemy as sa

revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('users', sa.Column('id', sa.Integer(), nullable=False), sa.Column('full_name', sa.String(length=150), nullable=False), sa.Column('email', sa.String(length=150), nullable=False), sa.Column('password_hash', sa.String(length=255), nullable=False), sa.Column('phone', sa.String(length=50), nullable=True), sa.Column('address', sa.Text(), nullable=True), sa.Column('role', sa.String(length=20), nullable=True), sa.Column('is_active', sa.Boolean(), nullable=True), sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()'), nullable=True), sa.PrimaryKeyConstraint('id'))
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=True)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('services', sa.Column('id', sa.Integer(), nullable=False), sa.Column('name', sa.String(length=150), nullable=False), sa.Column('description', sa.Text(), nullable=True), sa.Column('price', sa.Numeric(precision=10, scale=2), nullable=False), sa.Column('duration_minutes', sa.Integer(), nullable=False), sa.Column('image_url', sa.String(length=255), nullable=True), sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()'), nullable=True), sa.PrimaryKeyConstraint('id'))
    op.create_table('appointments', sa.Column('id', sa.Integer(), nullable=False), sa.Column('user_id', sa.Integer(), nullable=False), sa.Column('service_id', sa.Integer(), nullable=False), sa.Column('appointment_date', sa.Date(), nullable=False), sa.Column('appointment_time', sa.String(length=10), nullable=False), sa.Column('notes', sa.Text(), nullable=True), sa.Column('status', sa.String(length=20), nullable=True), sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('NOW()'), nullable=True), sa.ForeignKeyConstraint(['service_id'], ['services.id'], ), sa.ForeignKeyConstraint(['user_id'], ['users.id'], ), sa.PrimaryKeyConstraint('id'))


def downgrade() -> None:
    op.drop_table('appointments')
    op.drop_table('services')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
