from models import role_required
from flask import Blueprint, jsonify

main = Blueprint('main', __name__)

@main.route('/')
def ping():
    return jsonify({
        'status': 'ok'
    },200)
