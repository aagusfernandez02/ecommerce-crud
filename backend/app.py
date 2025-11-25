from dotenv import load_dotenv
load_dotenv(dotenv_path='../.env')

from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from flask_jwt_extended import JWTManager
from routes.main import main
from routes.auth import auth
from routes.products import products

app = Flask(__name__)
app.url_map.strict_slashes = False
CORS(app, origins=["*"], supports_credentials=True)
app.config.from_object(Config)
db.init_app(app)
with app.app_context():
    # db.drop_all()  # Elimina todas las tablas
    db.create_all()


# Flask-kwt-extended
jwt = JWTManager(app)

# Blueprints
app.register_blueprint(main)
app.register_blueprint(auth)
app.register_blueprint(products)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")