import json
import time
from datetime import datetime

from flask import Blueprint, request, render_template, url_for, jsonify
from werkzeug.utils import redirect

from lej_pol import db
from lej_pol.forms.alert_forms import AlertLeakForm, AlertImpurityForm
from lej_pol.models import Alert
from lej_pol.views.notification_views import QUEUE

bp_alerts = Blueprint("alert", __name__, url_prefix='/alerts')


@bp_alerts.route("/", methods=["GET"])
def get_alerts():
    data = Alert.query.all()
    return jsonify(json_list=[i.serialize for i in data])


@bp_alerts.route("/cms", methods=["GET"])
def get_cms():
    return render_template('alert_cms.html')


@bp_alerts.route('/leak', methods=["GET", "POST"])
def get_alert_leak():
    form = AlertLeakForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        alert = Alert(
            event_type='leak',
            event_start=datetime.now(),
            alert_msg=form.msg.data,
            location=f"{form.longitude.data},{form.latitude.data}",
        )
        db.session.add(alert)
        db.session.commit()

        return redirect(url_for('alert.get_alerts'))
    return render_template('alert_leak.html', form=form)


@bp_alerts.route("/impurity", methods=["GET", "POST"])
def get_alert_impurity():
    form = AlertImpurityForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        alert = Alert(
            event_type='impurity',
            event_start=datetime.now(),
            location=form.station_name.data,
            alert_msg=form.description.data
        )
        db.session.add(alert)
        db.session.commit()

        notification = {
            'timestamp': int(round(time.time() * 1000)),
            'type': "warning",
            'title': "Zgłaszanie zanieczyszczenia wody",
            'details': f"{form.station_name.data}: {form.description.data}"
        }

        QUEUE.append(notification)

        return redirect(url_for('alert.get_alerts'))
    return render_template('alert_impurity.html', form=form)
