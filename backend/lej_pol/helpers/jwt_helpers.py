import jwt
from functools import wraps
from flask import request, jsonify

from config.deployment import SECRET_KEY
from lej_pol.models import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        if not token:
            return jsonify({'message': 'No Token'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY)
            print('data', data)
            current_user = User.query.filter_by(email=data['email']).first()
        except Exception:
            return jsonify({'message': 'Invalid Token'}), 401
        return f(current_user, *args, **kwargs)

    return decorated
