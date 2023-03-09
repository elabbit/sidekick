from .db import db
from datetime import date



class Habit(db.Model):
    __tablename__ = 'habits'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(500), nullable=False)
    frequency = db.Column(db.Integer, nullable=False)
    daily = db.Column(db.Boolean, nullable=False)
    start_date = db.Column(db.Date, default=date.today, nullable=False)

    habit_owner = db.relationship('User', back_populates='user_habits')
    habit_tracked_instances = db.relationship('HabitTrack', back_populates='habit')

    def get_habit_tracks(self):
        return [track.to_dict() for track in self.habit_tracked_instances]

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'frequency': self.frequency,
            'daily': self.daily,
            'start_date': self.start_date,
            'habit_tracks': self.get_habit_tracks()
        }
