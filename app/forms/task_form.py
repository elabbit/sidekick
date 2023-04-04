from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class TaskForm(FlaskForm):
    list_id = IntegerField("List Id", validators=[DataRequired()])
    description = StringField("Description", validators=[DataRequired()])
