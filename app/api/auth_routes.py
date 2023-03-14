from flask import Blueprint, jsonify, session, request
from app.models import User, Icon, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import UserEditForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            birthday=form.data['birthday']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/edit/<int:id>', methods=['PUT'])
def edit_user(id):
    form = UserEditForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        editedUser = User.query.get(id)

        editedUser.email=form.data['email']
        db.session.commit()

        editedUser.username=form.data['username']
        db.session.commit()

        return editedUser.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/icon/<int:id>', methods=['PUT'])
def update_icon(id):
    editedUser = User.query.get(current_user.id)

    editedUser.default_icon = id
    db.session.commit()

    return editedUser.to_dict()

@auth_routes.route('/score/<int:score>', methods=['PUT'])
def update_score(score):
    editedUser = User.query.get(current_user.id)

    editedUser.score = score
    db.session.commit()

    return editedUser.to_dict()

@auth_routes.route('/poke/<int:pokeId>', methods=['PUT'])
def update_poke(pokeId):
    icon = Icon(
        user_id=current_user.id,
        icon=pokeId
    )
    db.session.add(icon)
    db.session.commit()
    editedUser = User.query.get(current_user.id)
    return editedUser.to_dict()
