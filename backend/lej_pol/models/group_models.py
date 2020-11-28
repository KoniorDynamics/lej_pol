from lej_pol import db


class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    group_name = db.Column(db.String(100))
    group_description = db.Column(db.String(200))
