from .db import db


class Icon(db.Model):
    __tablename__ = 'icons'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    icon = db.Column(db.Integer, nullable=False)

    icon_owner = db.relationship('User', back_populates='user_icons')
