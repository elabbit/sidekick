from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class UserEditForm(FlaskForm):
    email = StringField('email', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired()])
