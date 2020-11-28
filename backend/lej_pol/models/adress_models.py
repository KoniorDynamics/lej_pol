from lej_pol import db
from lej_pol.models.user_models import User


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    town = db.Column(db.String(100))
    street = db.Column(db.String(200))
    flat_number = db.Column(db.Integer)
    longitude = db.Column(db.REAL)
    latitude = db.Column(db.REAL)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
