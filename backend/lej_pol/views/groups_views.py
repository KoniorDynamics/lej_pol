from flask import Blueprint

from lej_pol.models import GroupUsers
from lej_pol.models.group_models import Group

bp_group = Blueprint("group", __name__, url_prefix='/groups')


@bp_group.route("/", methods=["GET"])
def get_groups():
    data = Group.query.all()
    print(data)
    return "Groups"


@bp_group.route("/user", methods=["GET"])
def get_user_group():
    data = GroupUsers.query.all()
    print(data)
    return "Groups Users"
