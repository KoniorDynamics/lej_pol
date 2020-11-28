from flask import Blueprint

from lej_pol.models.group_users_models import GroupUsers

bp_group_users = Blueprint("GroupUsers", __name__, url_prefix='/group/users')


@bp_group_users.route("/", methods=["GET"])
def home():
    data = GroupUsers.query.all()
    print(data)
    return "Groups Users"
