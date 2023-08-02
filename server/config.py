from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message

app = Flask(__name__)
app.config["SECRET_KEY"] = b'r\xdd\x9d0\x9e\x04O\x1b\x8f\xb7H\xa5\xe8\x87\xad\x99'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///event.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
# app.config["SECRET_KEY"] = b"\x1c-\x93\xe2\xa2\xbdq\xe1\x8c\x9e\xcc\x06d\xd4\xac\x19"
app.json.compact = False

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'rogonykiplagat@gmail.com'
app.config['MAIL_PASSWORD'] = 'nnxbugzfvvdavdij'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail=Mail(app)

db = SQLAlchemy()

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

db.init_app(app)

CORS(app)

api = Api(app)

jwt = JWTManager(app)
