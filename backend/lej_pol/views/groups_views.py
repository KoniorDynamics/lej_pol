from flask import Blueprint

from lej_pol.models.group_models import Group

bp_group = Blueprint("group", __name__, url_prefix='/groups')


@bp_group.route("/", methods=["GET"])
def home():
    data = Group.query.all()
    print(data)
    return "Groups"
