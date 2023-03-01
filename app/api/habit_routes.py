from flask import Blueprint, jsonify
from app.models import Habit
from flask_login import login_required

habit_routes = Blueprint('habits', __name__)


# Do I really need a get route for the user's habits? I can just get their habits from user.user_habits
# @habit_routes('/')
# @login_required
# def habits(userId):
#     habits = Habit.query.filter_by(user_id=userId).all()
