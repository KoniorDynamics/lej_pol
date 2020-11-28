from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField


class AlertLeakForm(FlaskForm):
    longitude = FloatField('Długość geograficzna')
    latitude = FloatField('Szerokość geograficzna')
    msg = StringField('Wiadomość')
    submit = SubmitField("Wyślij")
