from datetime import datetime

from flask import Blueprint, request, render_template

from lej_pol import db
from lej_pol.forms.alert_forms import AlertLeakForm
from lej_pol.models import Alert

bp_alerts = Blueprint("alert", __name__, url_prefix='/alerts')


@bp_alerts.route("/", methods=["GET"])
def get_alerts():
    data = Alert.query.all()
    print(data)
    return "Alert"


@bp_alerts.route('/leak', methods=["GET", "POST"])
def get_alert_leak():
    form = AlertLeakForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        alert = Alert(
            event_type='leak',
            event_start=datetime.now(),
            alert_msg=form.msg,
            location=f"{form.longitude},{form.latitude}",
        )
        db.add(alert)
        db.commit()

        return "Dziala"
    return render_template('alert_leak.html', form=form)
