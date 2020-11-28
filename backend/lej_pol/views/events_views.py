from flask import Blueprint

from lej_pol.models import Event

bp_events = Blueprint("events", __name__, url_prefix='/events')


@bp_events.route("/", methods=["GET"])
def home():
    data = Event.query.all()
    print(data)
    return "init"