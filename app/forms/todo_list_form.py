from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ToDoListForm(FlaskForm):
    user_id = IntegerField("User Id", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
