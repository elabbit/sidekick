from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField
from wtforms.validators import DataRequired, NumberRange

class HabitForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
    frequency = IntegerField("Frequency", validators=[DataRequired(), NumberRange(min=1, message="Frequency must be a positive integer")])
    daily = BooleanField("Daily", validators=[DataRequired()])
    start_date = DateField("Start Date", validators=[DataRequired()])
