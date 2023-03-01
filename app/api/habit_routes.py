from flask import Blueprint, jsonify
from app.models import Habit
from flask_login import login_required

habit_routes = Blueprint('habits', __name__)


# @habit_routes('/')
# @login_required
# def habits(userId):
#     habits = Habit.query.filter_by(user_id=userId).all()
#     return {'habits': [habit.to_dict() for habit in habits]}
