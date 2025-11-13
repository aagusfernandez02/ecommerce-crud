from dotenv import load_dotenv
from flask import Flask
from config import Config, login_manager
from models import db

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
login_manager.init_app(app)

# Blueprints


# Routes
@app.route("/")
def hello_world():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")