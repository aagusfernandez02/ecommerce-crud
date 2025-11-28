from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from models import Product, db, role_required

products = Blueprint('products', __name__, url_prefix='/products')

@products.route('/', methods=['GET'])
@jwt_required()
def products_get():
    products = Product.query.all()
    return jsonify({
        'status': 'ok',
        'data': [product.to_dict() for product in products]
    }), 200

@products.route('/', methods=['POST'])
@jwt_required()
@role_required('admin')
def products_post():
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
            'message': 'Product created succesfully',
            'data': new_product.to_dict()
        }
    }), 201

@products.route('/<int:id>', methods=['PUT'])
@jwt_required()
@role_required('admin')
def products_put(id):
    request_body = request.get_json()
    name = request_body.get('name')
    price = request_body.get('price')
    description = request_body.get('description')
    image_url = request_body.get('image_url', '')

    product = Product.query.filter_by(id=id).first()
    if not product:
        return jsonify({
            'status': 'error',
            'data': {
                'message': 'Product not found'
            }
        }), 409
    
    product.name = name
    product.price = price
    product.description = description
    product.image_url = image_url
    db.session.commit()

    return jsonify({
        'status': 'ok',
        'data': {
            'message': 'Product modified succesfully',
            'data': product.to_dict()
        }
    }), 201
        
@products.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required('admin')
def products_delete(id):
    product = Product.query.filter_by(id=id).first()
    if not product:
        return jsonify({
            'status': 'error',
            'data': {
                'message': 'Product not found'
            }
        }), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({
        'status': 'ok',
        'data': {
            'message': 'Product deleted successfully'
        }
    }), 200