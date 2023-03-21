from .db import db
from datetime import date


class TodoList(db.Model):
    __tablename__ = 'todo_lists'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(250), nullable=False)
    created_at = db.Column(db.Date, default=date.today, nullable=False)
    # updated_at = db.Column(db.Date, default=date.today, nullable=False)

    list_owner = db.relationship('User', back_populates= 'user_lists')
    tasks = db.relationship('TodoTask', back_populates='list')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name
        }
