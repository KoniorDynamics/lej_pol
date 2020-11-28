from flask import Blueprint

from lej_pol.models import Alert

bp_alerts = Blueprint("alert", __name__, url_prefix='/alerts')


@bp_alerts.route("/", methods=["GET"])
def home():
    data = Alert.query.all()
    print(data)
    return "Alert"
