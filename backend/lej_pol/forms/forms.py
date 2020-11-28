from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import DataRequired


class WaterForm(FlaskForm):
    latitude = FloatField("Latitude", validators=[DataRequired()])
    longitude = FloatField("Longitude", validators=[DataRequired()])
    message = StringField("Message", validators=[DataRequired()])
