from flask_jwt_extended import get_jwt_identity
from flask_sqlalchemy import SQLAlchemy
from functools import wraps
from flask import jsonify

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(300))
    role = db.Column(db.String(20), default='user')

    def has_role(self, role):
        return self.role == role
    
    def is_admin(self):
        return self.role == 'admin'
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role
        }


def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            current_username = get_jwt_identity()
            user = User.query.filter_by(username=current_username).first()
            if user and user.role == role:
                return f(*args, **kwargs)
            else:
                # Acceso no autorizado
                return jsonify({
                    'status': 'error',
                    'data': {
                        'message': 'Access denied. Insufficient permissions'
                    }
                }), 403
            # Unauthorized access
        return decorated_function
    return decorator