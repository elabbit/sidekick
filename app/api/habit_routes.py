from flask import Blueprint, jsonify, request
from app.models import Habit, db, HabitTrack
from flask_login import login_required
from app.forms import HabitEditForm, HabitTrackForm, HabitForm

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

@habit_routes.route('/<int:habitId>/edit', methods=['PUT'])
def edit_habit(habitId):
    form = HabitEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        edited_habit = Habit.query.get(habitId)

        edited_habit.frequency=form.data['frequency']
        db.session.commit()

        return edited_habit.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@habit_routes.route('/<int:habitId>/delete', methods=['DELETE'])
def delete_habit(habitId):
    deleted_habit = Habit.query.get(habitId)
    db.session.delete(deleted_habit)
    db.session.commit()

    return f'{habitId}'

# @habit_routes.route('/<int:habitId>/tracks')
# def habit_tracks(habitId):
#     pass


@habit_routes.route('/<int:habitId>/tracks', methods=['POST'])
def add_track(habitId):
    form = HabitTrackForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print("--------------------------------------------------------")
    # print(form.cleaned_data['date'].strftime('%Y-%m-%d'))
    if form.validate_on_submit():
        habit_track = HabitTrack(
            habit_id=habitId,
            date=form.data['date']
        )
        db.session.add(habit_track)
        db.session.commit()
        return habit_track.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@habit_routes.route('/tracks/<int:trackId>', methods=['DELETE'])
def delete_track(trackId):
    deleted_track = HabitTrack.query.get(trackId)
    db.session.delete(deleted_track)
    db.session.commit()
    return f'{trackId}'
