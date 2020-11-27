from flask import Blueprint

bp_main = Blueprint("main", __name__, url_prefix='/')


@bp_main.route("/", methods=["GET"])
def home():
    return "init"
