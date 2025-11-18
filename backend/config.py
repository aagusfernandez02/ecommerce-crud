import os

class Config:
    DB_USER = os.environ.get("MYSQL_USER")
    DB_PASSWORD = os.environ.get("MYSQL_PASSWORD")
    DB_HOST = os.environ.get("DB_HOST", "localhost")  # 'localhost' for local dev, 'mysql' for Docker
    DB_PORT = os.environ.get("DB_PORT", 3306)
    DB_NAME = os.environ.get("MYSQL_DATABASE")

    SQLALCHEMY_DATABASE_URI = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY")

    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")