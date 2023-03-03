from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from datetime import date


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.Date, default=date.today, nullable=False)
    birthday = db.Column(db.Date, nullable=False)
    score = db.Column(db.Integer, default=0)
    default_icon = db.Column(db.Integer, nullable=False)

    user_habits = db.relationship('Habit', back_populates='habit_owner')
    user_icons = db.relationship('Icon', back_populates='icon_owner')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'birthday': self.birthday,
            'score': self.score,
            'default_icon': self.default_icon,
            'user_icons': [icon.icon for icon in self.user_icons]
        }


