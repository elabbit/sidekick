from .db import db


class Habit(db.Model):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(500), nullable=False)
    frequency = db.Column(db.Integer, nullable=False)
    daily = db.Column(db.Boolean, nullable=False)

    habit_owner = db.relationship('User', back_populates='user_habits')
    habit_tracked_instances = db.relationship('HabitTrack', back_populates='habit')
