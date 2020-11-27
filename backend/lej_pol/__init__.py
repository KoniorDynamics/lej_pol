import os


from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
base_dir = os.path.abspath(os.path.dirname(__file__))


def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = F'sqlite:///{os.path.join(base_dir, "lej_pol.db")}'
    app.config["SECRET_KEY"] = 'dupa'

    from .views import bp_main
    app.register_blueprint(bp_main)

    db.init_app(app)
    migrate = Migrate(app, db)

    return app
