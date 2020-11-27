import os

from flask import Flask
from flask_migrate import Migrate

from lej_pol.db.db_init import db

base_dir = os.path.abspath(os.path.dirname(__file__))


def create_app():
    app = Flask(__name__,
                instance_relative_config=True
                )
    app.config.from_pyfile(os.path.join(os.path.dirname(base_dir), 'config', 'deployment.py'))
    from .views import bp_main
    from .views import bp_user
    from .views import bp_swagger
    app.register_blueprint(bp_main)
    app.register_blueprint(bp_user)
    app.register_blueprint(bp_swagger, url_prefix='/swagger')

    db.init_app(app)
    migrate = Migrate(app, db)
    return app
