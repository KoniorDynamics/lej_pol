import time

from flask import Blueprint, request

from lej_pol.views.notification_views import send_notification

bp_main = Blueprint("main", __name__, url_prefix='/flow')

DATA_LIST = []


@bp_main.route("", methods=["POST"])
def post_flow():
    data = request.get_json(force=True)
    # global DATA_LIST
    # DATA_LIST.append(data)

    for n in range(0, len(data), 10):
        data_to_analyze = {}
        test = data[n:n+10]
        for idx, el in enumerate(test):
            data_to_analyze[idx] = [round(el["flow"], 5)]

        send_notification({"data": data_to_analyze})

    return 'Flow'
