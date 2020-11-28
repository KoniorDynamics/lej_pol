from lej_pol import db
from lej_pol.models.event_models import user_event


class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True)
    password = db.Column(db.String(580))
    surname = db.Column(db.String(100))
    address_id = db.Column(db.Integer, db.ForeignKey('address.address_id'))
    alert_id = db.Column(db.Integer, db.ForeignKey('alert.alert_id'))
    _event = db.relationship('Event', secondary=user_event, backref=db.backref("user", lazy="dynamic"))

