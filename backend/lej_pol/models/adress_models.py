from lej_pol import db


class Address(db.Model):

    address_id = db.Column(db.Integer, primary_key=True)
    town = db.Column(db.String(100))
    street = db.Column(db.String(200))
    flat_number = db.Column(db.Integer)
    longitude = db.Column(db.REAL)
    latitude = db.Column(db.REAL)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
