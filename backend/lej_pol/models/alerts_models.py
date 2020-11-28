from datetime import datetime

from lej_pol import db


def dump_datetime(value):
    """Deserialize datetime object into string form for JSON processing."""
    if value is None:
        return None
    return [value.strftime("%Y-%m-%d"), value.strftime("%H:%M:%S")]


class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(200))
    event_start = db.Column(db.DateTime, default=datetime.utcnow())
    location = db.Column(db.String(200))
    alert_msg = db.Column(db.String(400))

    @property
    def serialize(self):
        return {
            'event_type': self.event_type,
            'event_start': dump_datetime(self.event_start),
            'location': self.location,
            'alert_msg': self.alert_msg
        }
