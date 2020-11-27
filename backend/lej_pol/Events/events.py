from flask_socketio import emit, send

from lej_pol import socketio


@socketio.on('message')
def get_water_meter_data(msg):
    print(msg)


@socketio.on('connected')
def handle_connection():
    emit('ok', {'connected': True}, broadcast=True)
