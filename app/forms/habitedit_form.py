from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, NumberRange

class HabitEditForm(FlaskForm):
    frequency = IntegerField("Frequency", validators=[DataRequired(), NumberRange(min=1, message="Frequency must be a positive integer")])
