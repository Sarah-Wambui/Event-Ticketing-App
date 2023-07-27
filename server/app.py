from config import app, db, api
from flask_restful import Resource
from models import User, Event, Ticket, Payment, Purchase
from flask import make_response, jsonify, request, render_template, Response
import datetime
import jwt
from sqlalchemy.exc import IntegrityError


# ["SECRET_KEY"]= "02c2e6b7d401a288"
# app.secret_key = b"\x1c-\x93\xe2\xa2\xbdq\xe1\x8c\x9e\xcc\x06d\xd4\xac\x19"


class Home(Resource):
    def get(self):
        return "message: Welcome to Event Ticketing"


api.add_resource(Home, "/")


# class SignUp(Resource):
#     def post(self):
#         data = request.get_json()

#         new_user = User(
#             username=data["username"],
#             email=data["email"],
#             _password_hash=data["_password_hash"],
#         )
#         db.session.add(new_user)
#         db.session.commit()

#         return make_response(jsonify(new_user.to_dict()), 201)


class SignUp(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")
        email = data.get("email")

        user = User(
            username=username,
            email=email,
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
        email = data.get("email")
        password = data.get("password")

        user = User.query.filter(User.email == email).first()

        if user:
            if user.authenticate(password):
                payload = {
                    "user_id": user.id,
                    # "username": user.username,
                    "email": user.email,
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=2),
                }
                # token = jwt.encode(payload, app.config["SECRET_KEY"])
                token = jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")
                return Response(response=token.decode("UTF-8"), status=201, content_type="application/json")
                # return jsonify(token.decode("UTF-8")), 201
            return jsonify({"message": "invalid"}), 401
        return jsonify({"message": "Invalid credentials"}), 401


api.add_resource(Login, "/login")


class GetUsers(Resource):
    def get(self):
        users = []

        for user in User.query.all():
            getuser = user.to_dict()
            users.append(getuser)

        response = make_response(jsonify(users), 200)
        return response
api.add_resource(GetUsers, "/user")


class GetEvents(Resource):
    def get(self):
        events = []

        for event in Event.query.all():
            getevent = event.to_dict()
            events.append(getevent)
        response = make_response(jsonify(events), 200)
        return response
api.add_resource(GetEvents, "/events")

class PostEvent(Resource):
    def post(self):
        events = request.get_json()
        new_event= Event(
            title=events["title"],
            venue=events["venue"],
            description= events["description"],
            organizer=events["organizer"],
            category =events["category"],
            image_url = events["image_url"],
            ticket_price=events["ticket_price"],
            available_tickets=events["available_tickets"],
            event_time=events["event_time"]
        )
        
        db.session.add(new_event)
        db.session.commit()
        return make_response(jsonify(new_event.to_dict()), 201)
api.add_resource(PostEvent, "/postevents")    


if __name__ == "__main__":
    app.run(port=5555, debug=True)
