import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
# from flask_socketio import SocketIO

from lej_pol.db.db_init import db

base_dir = os.path.abspath(os.path.dirname(__file__))

# socketio = SocketIO(cors_allowed_origins="*", logger=True)


def create_app():
    app = Flask(__name__,
                instance_relative_config=True
                )
    app.config.from_pyfile(os.path.join(os.path.dirname(base_dir), 'config', 'deployment.py'))
    app.config['SECRET_KEY'] = b'\xc0\xb1\x16\x98\x86wI\xf6$_\xe8\x00)\x19\x81b'

    from .views.adress_views import bp_address
    from .views.alerts_views import bp_alerts
    from .views.groups_views import bp_group
    from .views import bp_main
    from .views import bp_user
    from .views import bp_swagger
    from .views.events_views import bp_events
    from .views.notification_views import bp_notification
    from .events.events import ws

    app.register_blueprint(bp_group)
    app.register_blueprint(bp_alerts)
    app.register_blueprint(bp_address)
    app.register_blueprint(bp_user)
    app.register_blueprint(bp_events)
    app.register_blueprint(bp_notification)
    app.register_blueprint(bp_main)
    app.register_blueprint(ws)
    app.register_blueprint(bp_swagger, url_prefix='/swagger')

    db.init_app(app)
    CORS(app)
    # socketio.init_app(app)
    Migrate(app, db)

    return app
