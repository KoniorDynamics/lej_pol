from lej_pol import db


class GroupUsers(db.Model):
    group_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)