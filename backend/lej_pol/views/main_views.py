from flask import Blueprint, request

from lej_pol.views.notification_views import send_notification

bp_main = Blueprint("main", __name__, url_prefix='/flow')

DATA_LIST = []


@bp_main.route("", methods=["POST"])
def post_flow():
    data = request.get_json(force=True)
    global DATA_LIST
    DATA_LIST.append(data)
    if len(DATA_LIST) == 10:
        test = []
        data_to_analyze = {}
        for idx, el in enumerate(DATA_LIST):
            data_to_analyze[idx] = [round(el["flow"], 5)]
            test.append(round(el["flow"], 5))
        if len(set(test)) == 1 and test[0] == 0:
            DATA_LIST = []
        else:
            send_notification({"data": data_to_analyze})
            DATA_LIST = []

    return 'Flow'
