from lej_pol import db



class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_start = db.Column(db.DateTime)
    event_duration = db.Column(db.Interval)
    flow = db.Column(db.Float)
    price = db.Column(db.Float)
    event_type = db.Column(db.String(100))
