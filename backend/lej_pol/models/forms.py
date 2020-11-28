from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class WaterForm(FlaskForm):
    location = StringField(" location", validators=[DataRequired()])
    what_data = StringField("data:", validators=[DataRequired()])
