from lej_pol import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(200), unique=True)
    password = db.Column(db.String(580))
    surname = db.Column(db.String(100))
    address_id = db.Column(db.Integer)
    alert_id = db.Column(db.Integer)
