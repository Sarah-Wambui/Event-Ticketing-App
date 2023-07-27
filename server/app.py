from config import app, db, api
from flask_restful import Resource
from models import User, Event, Ticket, Payment, Purchase
from flask import make_response, jsonify, request
from sqlalchemy.exc import IntegrityError
import datetime
import jwt   

class Home(Resource):
    def get(self):
        return "message: Welcome to Event Ticketing"
api.add_resource(Home, "/")

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
api.add_resource(Users, "/users")

class SignUp(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        email = data.get("email") 

        user = User(
            username = username,
            email = email,
        )
        # the setter will encrypt this
        user.password_hash = password
        
        print("first")

        try:
            print("here")
            db.session.add(user)
            db.session.commit()


            print(user.to_dict())
            return make_response(jsonify(user.to_dict()), 201)
        except IntegrityError:
            print("no, here!")
            return {"error": "422 Unprocessable request"}, 422
api.add_resource(SignUp, "/signup")


class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        # email = data.get("email")

        user = User.query.filter(User.username == username).first()

        print("Get the token!")

        if user:
            if user.authenticate(password):
                payload = {
                    "user_id": user.id,
                    "username": user.username,
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=2)
                }
                token = jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")
                print("we got the token!")
                print({"token":token})
                return  {"token": token}
        print("Wrong details!")
        return make_response(jsonify({"error": "Invalid details"}), 401)

api.add_resource(Login, "/login")


if __name__ == "__main__":
    app.run(port=5555, debug=True)