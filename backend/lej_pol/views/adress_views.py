from flask import Blueprint

from lej_pol.models import Address

bp_address = Blueprint("address", __name__, url_prefix='/address')


@bp_address.route("/", methods=["GET"])
def home():
    data = Address.query.all()
    print(data)
    return "Address"
