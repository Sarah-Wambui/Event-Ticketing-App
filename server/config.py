# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# from flask_bcrypt import Bcrypt
# from flask_cors import CORS
# from flask_migrate import Migrate
# from flask_restful import Api, Resource

# app = Flask(__name__)
# app.config["SECRET_KEY"] = b'r\xdd\x9d0\x9e\x04O\x1b\x8f\xb7H\xa5\xe8\x87\xad\x99'
# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///event.db"
# app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
# # app.config["SECRET_KEY"] = b"\x1c-\x93\xe2\xa2\xbdq\xe1\x8c\x9e\xcc\x06d\xd4\xac\x19"
# app.json.compact = False
# app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False


# db = SQLAlchemy()

# migrate = Migrate(app, db)

# bcrypt = Bcrypt(app)

# db.init_app(app)

# CORS(app)

# api = Api(app)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)
app.config["SECRET_KEY"] = b'r\xdd\x9d0\x9e\x04O\x1b\x8f\xb7H\xa5\xe8\x87\xad\x99'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///event.db"
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
    # oauth_config={  # OAuth config. See https://github.com/swagger-api/swagger-ui#oauth2-configuration .
    #    'clientId': "your-client-id",
    #    'clientSecret': "your-client-secret-if-required",
    #    'realm': "your-realms",
    #    'appName': "your-app-name",
    #    'scopeSeparator': " ",
    #    'additionalQueryStringParams': {'test': "hello"}
    # }
)

app.register_blueprint(swaggerui_blueprint)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 587
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
