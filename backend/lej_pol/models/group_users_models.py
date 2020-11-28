from lej_pol import db
from lej_pol.models import Group
from lej_pol.models.user_models import User


class GroupUsers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id)),
    group_id = db.Column(db.Integer, db.ForeignKey(Group.id))
