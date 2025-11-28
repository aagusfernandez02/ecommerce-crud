from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, db
from flask_jwt_extended import create_access_token, set_access_cookies, unset_jwt_cookies, jwt_required, get_jwt_identity

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    username = request_body.get('username')
    password = request_body.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({
            'status': 'error',
            'data': {
                'message': 'Invalid credentials'
            }
        }), 401
    
    access_token = create_access_token(identity=str(user.id))
    response = jsonify({
        'status': 'ok',
        'data': {
            'user': user.to_dict()
        }
    })
    set_access_cookies(response, access_token)
    return response, 200
        

@auth.route('/signup', methods=['POST'])
def signup_post():
    request_body = request.get_json()
    username = request_body.get('username')
    password = request_body.get('password')
    role = request_body.get('role', 'user')

    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({
            'status': 'error',
            'data': {
                'message': 'User with that username already exists'
            }
        }), 409
    
    new_user = User(username=username, password=generate_password_hash(password), role=role)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({
        'status': 'ok',
        'data': {
            'message': 'User created succesfully',
            'data': new_user.to_dict()
        }
    }), 201


@auth.route('/logout', methods=['POST'])
def logout():
    response = jsonify({
        'status': 'ok',
        'data': {
            'msg': 'logout successful'
        }
    })
    unset_jwt_cookies(response)
    return response, 200

@auth.route("/check-auth")
@jwt_required(optional=True)
def check_auth():
    identity = get_jwt_identity()
    if not identity:
        return jsonify({"logged_in": False}), 401
    
    user_identity = User.query.filter_by(id=int(identity)).first()

    return jsonify({
        "logged_in": True,
        "user": user_identity.to_dict()
    })