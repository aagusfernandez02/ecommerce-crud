from dotenv import load_dotenv
load_dotenv(dotenv_path='../.env')

from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from flask_jwt_extended import JWTManager, create_access_token, get_jwt, get_jwt_identity, jwt_required, set_access_cookies, unset_jwt_cookies
from routes.main import main
from routes.auth import auth
from routes.products import products

from datetime import datetime
from datetime import timedelta
from datetime import timezone

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


# Refresh tokens nearly to expire
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original response
        return response

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")