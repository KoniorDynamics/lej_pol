from flask import Blueprint
from werkzeug.security import generate_password_hash

from lej_pol import db
from lej_pol.models import Address, User

bp_address = Blueprint("address", __name__, url_prefix='/address')


@bp_address.route("/", methods=["GET"])
def get_adress():
    # user = User.query.filter(email='katarzyna.rzesikowska@gmail.com')
    #
    # adress = Address(
    #     town='cos',
    #     street='cos',
    #     flat_number=123
    # )
    # user.addresses.append(adress)
    # db.session.add(user)
    # db.session.add(adress)
    # db.session.commit()
    data = Address.query.all()
    print(data)
    return "Address"
