from datetime import datetime

from lej_pol import db
from lej_pol.models.user_models import User


class Alert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_type = db.Column(db.String(200))
    event_start = db.Column(db.DateTime, default=datetime.utcnow())
    leak_detection = db.Column(db.Boolean)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
