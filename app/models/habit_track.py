from .db import db


class HabitTrack(db.Model):
    __tablename__ = 'habit_tracks'

    id = db.Column(db.Integer, primary_key=True)
    habit_id = db.Column(db.Integer, db.ForeignKey('habits.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)

    habit = db.relationship('Habit', back_populates='habit_tracked_instances')

    def to_dict(self):
        return self.date
    
