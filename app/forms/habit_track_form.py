from flask_wtf import FlaskForm
from wtforms import DateField, IntegerField
from wtforms.validators import DataRequired

class HabitTrackForm(FlaskForm):
    date = DateField("Date", validators=[DataRequired()])
