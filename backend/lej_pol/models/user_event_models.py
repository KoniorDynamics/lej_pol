from lej_pol import db


class Events(db.Model):
    event_id = db.Column(db.Integer, primary_key=True)
    user_ud = db.Column(db.Integer)
    