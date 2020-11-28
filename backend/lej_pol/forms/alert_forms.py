from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField


class AlertLeakForm(FlaskForm):
    longitude = FloatField('Długość geograficzna')
    latitude = FloatField('Szerokość geograficzna')
    msg = StringField('Wiadomość')
    submit = SubmitField("Wyślij")


class AlertImpurityForm(FlaskForm):
    station_name = StringField(label='Stacja uzdatniania wody')
    description = StringField(label='Treść alertu')
    submit = SubmitField(label='Wyślij')
