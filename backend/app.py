from dotenv import load_dotenv
load_dotenv(dotenv_path='../.env')

from flask import Flask
from config import Config
from models import db
from flask_jwt_extended import JWTManager
from routes.main import main
from routes.auth import auth

app = Flask(__name__)
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


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")