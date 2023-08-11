import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_swagger_ui import get_swaggerui_blueprint
from dotenv import load_dotenv
load_dotenv()

# app = Flask(__name__)
app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
app.config["SECRET_KEY"] = b'r\xdd\x9d0\x9e\x04O\x1b\x8f\xb7H\xa5\xe8\x87\xad\x99'
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///event.db"
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
app.json.compact = False



SWAGGER_URL = '/api/docs'  # URL for exposing Swagger UI (without trailing '/')
API_URL = '/static/swagger.json'  # Our API url (can of course be a local resource)

# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    API_URL,
    config={  # Swagger UI config overrides
        'app_name': "Test application"
    },
)

app.register_blueprint(swaggerui_blueprint)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'eventgoticketing@gmail.com'
app.config['MAIL_PASSWORD'] = 'rukjdikodbwpgisx'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail=Mail(app)

db = SQLAlchemy()

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)

db.init_app(app)

CORS(app)

api = Api(app)

jwt = JWTManager(app)



