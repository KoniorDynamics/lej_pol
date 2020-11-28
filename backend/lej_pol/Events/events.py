import json
import os

from flask_socketio import emit, send

from lej_pol import socketio
from rx import from_
from rx import operators as ops

source = from_(open(os.path.join(".", "test_flow.dat")))

source.pipe(
    ops.map(lambda row: json.loads(row)),
    # ops.map(lambda row: {row["time"]: round(row["flow"], 5)}),
    ops.buffer_with_count(3),
    ops.map(lambda row: sorted(row, key=lambda k: int(k["time"]))),
    ops.map(lambda row: {el["time"]: round(el["flow"], 5) for el in row}),
    # ops.map(lambda row: {"data": {k: v for d in row for k, v in d.items()}}),
    ops.map(lambda row: {"data": row}),
    ops.map(lambda row: json.dumps(row))
).subscribe(on_next=lambda row: print(row))


@socketio.on('message')
def get_water_meter_data(msg):
    print(msg)


@socketio.on('connected')
def handle_connection():
    emit('ok', {'connected': True}, broadcast=True)


@socketio.on('json')
def handle_json(json_data):
    emit(json_data, json=True, broadcast=True, namespace="/model_ml")
