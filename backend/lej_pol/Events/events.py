import json
import os
import requests

from flask_socketio import emit, send

from lej_pol import socketio
from rx import from_
from rx import operators as ops


ml_endpoint = "http://127.0.0.1.8000/model_ml"

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


@socketio.on('message')
def get_water_meter_data(msg):
    print(msg)


@socketio.on('connected')
def handle_connection():
    emit('ok', {'connected': True}, broadcast=True)




