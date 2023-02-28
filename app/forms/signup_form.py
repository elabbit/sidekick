from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, EqualTo, ValidationError, PasswordField
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def no_whitespace(form, field):
    # Checking password does not include whitespace
    password = field.data
    if password.__contains__(" "):
        raise ValidationError ("Password cannot contain whitespace")

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    password = PasswordField('password', validators=[DataRequired(), EqualTo('confirm', message='Passwords must match'), no_whitespace])
    confirm_password = PasswordField('confirm password', validators=[DataRequired()])
    birthday = DateField('Birthday (YYYY-MM-DD)', validators=[DataRequired()])
