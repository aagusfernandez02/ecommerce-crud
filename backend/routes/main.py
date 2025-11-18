from models import role_required
from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

main = Blueprint('main', __name__)

@main.route('/')
def ping():
    return jsonify({
        'status': 'ok'
    }), 200

@main.route('/products')
@jwt_required()
def products():
    products = [
        'Leche condensada',
        'Té',
        'Pan',
        'Pizza',
        'Hamburguesa',
        'Queso',
        'Yogur',
        'Vino'
    ]
    return jsonify({
        'status': 'ok',
        'data': products
    }), 200

@main.route('/products-admin')
@jwt_required()
@role_required('admin')
def products_admin():
    products = [
        {'description': 'Leche condensada', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Té', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Pan', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Pizza', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Hamburguesa', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Queso', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Yogur', 'price': 3000, 'upc': '0011223344'},
        {'description': 'Vino', 'price': 3000, 'upc': '0011223344'}
    ]
     
    return jsonify({
        'status': 'ok',
        'data': products
    }), 200