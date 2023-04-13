from .db import db
from datetime import date


class TodoTask(db.Model):
    __tablename__ = 'todo_tasks'
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('todo_lists.id'), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    status = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.Date, default=date.today, nullable=False)
    # updated_at = db.Column(db.Date, default=date.today, nullable=False)

    list = db.relationship('TodoList', back_populates='tasks')

    def to_dict(self):
        return {
            'id':self.id,
            'list_id': self.list_id,
            'description': self.description,
            'status': self.status
            }
