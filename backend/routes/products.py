from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import Product, db

products = Blueprint('products', __name__, url_prefix='/products')

@products.route('/', methods=['GET', 'POST'])
@jwt_required()
def products_get_post():
    if request.method == 'POST':
        request_body = request.get_json()
        name = request_body.get('name')
        price = request_body.get('price')
        description = request_body.get('description')
        image_url = request_body.get('image_url', '')

        product = Product.query.filter_by(name=name).first()
        if product:
            return jsonify({
                'status': 'error',
                'data': {
                    'message': 'Product with that name already exists'
                }
            }), 409
        
        new_product = Product(name=name, price=price, description=description, image_url=image_url)
        db.session.add(new_product)
        db.session.commit()
        return jsonify({
            'status': 'ok',
            'data': {
                'message': 'User created succesfully',
                'data': new_product.to_dict()
            }
        }), 201

    products = Product.query.all()
    return jsonify({
        'status': 'ok',
        'data': [product.to_dict() for product in products]
    }), 200
        