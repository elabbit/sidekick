from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Email
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    current = User.query.get(form.data['id'])
    if(field.data == current.email):
        return
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def username_exists(form, field):
    # Checking if username is already in use
    current = User.query.get(form.data['id'])
    if(field.data == current.username):
        return
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

class UserEditForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email, user_exists])
    username = StringField('username', validators=[DataRequired(), username_exists])
