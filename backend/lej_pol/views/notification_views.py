import time
from datetime import datetime

from flask import Blueprint, jsonify

from lej_pol import db
from lej_pol.helpers.ml_helpers import predict
from lej_pol.models import Event

bp_notification = Blueprint("notification", __name__, url_prefix='/notification')

QUEUE = []

DICT_ELEMENTS_START = {
    "tap": "Odkręciłes kran",
    "shower": "Zacząłeś prysznic",
    "dishwasher": "Włączyłeś zmywarkę",
    "washing machine": "Zacząłeś pranie",
    "shower + washing machine": "Zacząłeś prysznic i pranie",
    "shower + dishwasher": "Zacząłeś prysznic i włączyłeś zmywarkę",
    "shower + tap": "Zacząłeś prysznic i okręciłeś kran",
    "dishwasher + tap": "Okręciłeś kran i włączyłeś zmywarkę",
    "tap + washing machine": "Okręciłeś kran i zacząłeś pranie",
    "dishwasher + washing machine": "Zacząłeś pranie i włączyłeś zmywarkę",
}

DICT_ELEMENTS_END = {
    "tap": "Kran chodził ",
    "shower": "Brałeś prysznic ",
    "dishwasher": "Zmywarka chodziła ",
    "washing machine": "Pranie trwało ",
    "shower + washing machine": "Prysznic i pranie zajęło ",
    "shower + dishwasher": "Prysznic i zmywarka trwały ",
    "shower + tap": "Prysznic i kran chodził ",
    "dishwasher + tap": "Zmywarka i kran chodziły ",
    "tap + washing machine": "Pranie i kran chodziły ",
    "dishwasher + washing machine": "Pranie i zmywarka chodziły ",
}

PRICE = 11.11


def send_notification(row):
    time.sleep(10)
    x = predict(row)

    finish = 0
    time_finish = 0
    sum_values = 0
    for n in ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]:
        sum_values += row['data'][n][0]
        if row['data'][n][0] == 0 and finish == 0:
            finish = 1
            time_finish = int(n)

    print('tutaj', finish, time_finish)
    obj = Event.query.order_by(-Event.id).first()

    if 'element2' in x.keys() and (obj is None or obj.price is not None):
        notification = {
            'timestamp': int(round(time.time() * 1000)),
            'type': "decision",
            'title': "A co to?",
            'details': "Jeszcze się uczę! Podpowiedz mi co teraz robiłeś?",
            "options": [x['element1'], x['element2']]
        }

        QUEUE.append(notification)
        return True

    if obj is None or obj.price is not None:
        notification = {
            'timestamp': int(round(time.time() * 1000)),
            'type': "standard",
            'title': "Początek działania",
            'details': DICT_ELEMENTS_START[x['element1']],
        }

        QUEUE.append(notification)
        if finish == 1:
            event = Event(
                event_start=datetime.now(),
                flow=sum_values,
                event_type=x['element1'],
                price=sum_values * PRICE,
                event_duration=time_finish
            )
            db.session.add(event)
            db.session.commit()

            notification = {
                'timestamp': int(round(time.time() * 1000)),
                'type': "standard",
                'title': "Koniec działania",
                'details': f"{DICT_ELEMENTS_END[x['element1']]}{time_finish} min, zużyto {round(sum_values, 5)} m3 wody i kosztowało to {round(sum_values * PRICE, 2)} zł",
            }

            QUEUE.append(notification)
        else:
            event = Event(
                event_start=datetime.now(),
                flow=sum_values,
                event_type=x['element1'],
            )
            db.session.add(event)
            db.session.commit()
        return True

    elif obj.price is None:
        obj.flow += sum_values
        db.session.commit()

        if finish == 1:
            obj.price = obj.flow * PRICE,
            obj.event_duration = (datetime.now() - obj.event_start).total_seconds()

            db.session.commit()

            notification = {
                'timestamp': int(round(time.time() * 1000)),
                'type': "standard",
                'title': "Koniec działania",
                'details': f"{DICT_ELEMENTS_END[obj.event_type]}{obj.event_duration} min, zużyto {round(obj.flow, 5)} m3 wody i kosztowało to {round(obj.price, 2)} zł",
            }

            QUEUE.append(notification)
            return True


@bp_notification.route("/", methods=["GET"])
def get_notification():
    x = QUEUE
    return jsonify(x)
