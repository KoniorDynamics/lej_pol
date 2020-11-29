from flask import Blueprint
from werkzeug.security import generate_password_hash

from lej_pol import db
from lej_pol.models import Address, User

bp_address = Blueprint("address", __name__, url_prefix='/address')


@bp_address.route("/", methods=["GET"])
def get_adress():
    data = Address.query.all()
    print(data)
    return "Address"
