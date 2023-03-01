from flask import Blueprint, jsonify
from app.models import Habit
from flask_login import login_required

habit_routes = Blueprint('habits', __name__)

@habit_routes('/')
@login_required
def habits():
    pass


