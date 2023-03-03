from flask import Blueprint, jsonify, request
from app.models import Habit, db
from flask_login import login_required
from app.forms.habit_form import HabitForm

habit_routes = Blueprint('habits', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
            # errorMessages.append(f'{field} : {error}')
    return errorMessages


@habit_routes.route('/<int:userId>')
def habits(userId):
    habits = Habit.query.filter_by(user_id=userId).all()
    return {'habits': [habit.to_dict() for habit in habits]}

@habit_routes.route('/', methods=['POST'])
def create_habit():
    form = HabitForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        habit = Habit(
            user_id=form.data['user_id'],
            name=form.data['name'],
            frequency=form.data['frequency'],
            daily= form.data['daily'] == 'daily',
            start_date=form.data['start_date']
        )
        db.session.add(habit)
        db.session.commit()
        return habit.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
