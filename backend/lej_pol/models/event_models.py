from sqlalchemy.orm import relationship

from lej_pol import db

user_event = db.Table(
    'user_event',
    db.Column('user_id', db.Integer, db.ForeignKey('user.user_id')),
    db.Column('event_id', db.Integer, db.ForeignKey('event.event_id'))

)


class Event(db.Model):
    event_id = db.Column(db.Integer, primary_key=True)
    event_start = db.Column(db.DateTime)
    event_duration = db.Column(db.Interval)
    flow = db.Column(db.Float)
    price = db.Column(db.Float)
    event_type = db.Column(db.String(100))
