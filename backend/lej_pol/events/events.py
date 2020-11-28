from flask import render_template, Blueprint
from flask_cors import CORS, cross_origin
from flask_socketio import emit, send

from lej_pol import socketio


ws = Blueprint('ws', __name__, url_prefix='/api_v1')
CORS(ws)


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
