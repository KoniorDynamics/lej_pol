from lej_pol import db
from lej_pol.models.alerts_models import Alert
from lej_pol.models.event_models import Event

user_event = db.Table(
    'user_event',
    db.Column('event_id', db.Integer, db.ForeignKey(Event.id)),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

user_alert = db.Table(
    'user_alert',
    db.Column('alert_id', db.Integer, db.ForeignKey(Alert.id)),
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'))
)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True)
    password = db.Column(db.String(580))
    surname = db.Column(db.String(100))
    addresses = db.relationship('Address', backref='User')
    events = db.relationship('Event', secondary=user_event, backref=db.backref('user', lazy="dynamic"))
    alerts = db.relationship('Alert', secondary=user_alert, backref=db.backref('user', lazy="dynamic"))

