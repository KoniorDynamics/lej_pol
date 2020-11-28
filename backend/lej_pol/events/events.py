import json
import os
import requests

from flask import render_template, Blueprint
from flask_cors import CORS, cross_origin
from flask_socketio import emit, send

from lej_pol import socketio
from rx import from_
from rx import operators as ops

ws = Blueprint('ws', __name__, url_prefix='/api_v1')

CORS(ws)
ml_endpoint = "http://127.0.0.1.8000/model_ml"


@ws.route("/water_meter", methods=['GET'])
@cross_origin()
def water_meter():
    socketio.emit('connected', {})
    # return render_template('index.html')
    return 'ok', 200


@socketio.on('message', namespace='/api_v1/water_meter')
@cross_origin()
def get_water_meter_data(msg):
    print(msg)

    source = from_(open(os.path.join(".", "test_flow.dat")))

    source.pipe(
        ops.map(lambda row: json.loads(row)),
        # ops.map(lambda row: {row["time"]: round(row["flow"], 5)}),
        ops.buffer_with_count(10),
        ops.map(lambda row: sorted(row, key=lambda k: int(k["time"]))),
        ops.map(lambda row: {str(idx): [round(el["flow"], 5)] for idx, el in enumerate(row)}),
        # ops.map(lambda row: {"data": {k: v for d in row for k, v in d.items()}}),
        ops.map(lambda row: {"data": row}),
        ops.map(lambda row: json.dumps(row))
    ).subscribe(on_next=lambda row: print(row))
    # .subscribe(on_next=lambda row: requests.post(ml_endpoint, row))
