from datetime import datetime, timedelta

import jwt
from flask import Blueprint, request, make_response, jsonify
from werkzeug.security import check_password_hash, generate_password_hash

from config.deployment import SECRET_KEY
from lej_pol import db

from lej_pol.helpers import token_required
from lej_pol.models import User

bp_user = Blueprint("/user", __name__, url_prefix='/user')


@bp_user.route("/login", methods=["POST"])
def login():
    data = request.json

    if not data or not data.get('email') or not data.get('password'):
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="Login required"'}
        )

    user = User.query.filter_by(email=data.get('email')).first()

    if not user:
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate': 'Basic realm ="User does not exist"'}
        )

    if check_password_hash(user.password, data.get('password')):
        token = jwt.encode({
            'email': user.email,
            'exp': datetime.utcnow() + timedelta(minutes=30)
        }, SECRET_KEY)
        return make_response(jsonify({'token': token.decode('UTF-8')}), 201)

    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate': 'Basic realm ="Email or Password is incorrect"'}
    )


@bp_user.route('/signup', methods=['POST'])
def signup():
    data = request.json

    name, email, password = data.get('name'), data.get('email'), data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(
            name=name,
            email=email,
            password=generate_password_hash(password)
        )
        db.session.add(user)
        db.session.commit()

        return make_response('Successfully registered.', 201)
    else:
        return make_response('User already exists. Please Log in.', 202)
