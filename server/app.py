from config import app, db, api
from flask_restful import Resource
from models import User, Event,Payment
from flask import make_response, jsonify, request
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required  
from flask_mail import Message
from config import mail

class Home(Resource):
    def get(self):
        return "message: Welcome to Event Ticketing"
    
api.add_resource(Home, "/")

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
api.add_resource(Users, "/users")

class UserById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        return make_response(jsonify(user.to_dict()), 200)
api.add_resource(UserById, "/users/<int:id>")

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

            msg = Message('Hello from the other side!',
                 sender =   'rogonykiplagat@gmail.com', 
                 recipients = [email])
            msg.body = "Your account is created successfully"
            mail.send(msg)
            print("testing")
            return "Message sent"


            # print(user.to_dict())
            # return make_response(jsonify(user.to_dict()), 201)
        except IntegrityError:
            print("no, here!")
            return {"error": "422 Unprocessable request"}, 422
api.add_resource(SignUp, "/signup")


class Login(Resource):
    def post(self):
        data = request.get_json()

        email = data.get("email")
        password = data.get("password")

        user = User.query.filter(User.email == email).first()

        print("Get the token!")

        if user:
          if user.authenticate(password):
            token = create_access_token(identity=user.id)
            print({"token":token})
            return jsonify(token=token)
        return make_response(jsonify({"error": "Invalid details"}), 401)

api.add_resource(Login, "/login")


class Protected(Resource):
    @jwt_required()
    def get(self):
        return {"message": "This is only available for valid tokens."}, 200
api.add_resource(Protected, "/protected")



class Events(Resource):
    def get(self):
        events = []

        for event in Event.query.all():
            getevent = event.to_dict()
            events.append(getevent)
        response = make_response(jsonify(events), 200)
        return response
    
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
            date_time=events["date_time"]
        )
        
        db.session.add(new_event)
        db.session.commit()
        return make_response(jsonify(new_event.to_dict()), 201)
api.add_resource(Events, "/events")

class EventById(Resource):
    def get(self, id):
        event= Event.query.filter_by(id=id).first()
        return make_response(jsonify(event.to_dict()), 200)
    

    def patch(self, id):
        event= Event.query.filter_by(id=id).first()

        for attr in request.form:
            setattr(event, attr, request.form[attr])
        db.session.add(event)
        db.session.commit()

        return make_response(jsonify(event.to_dict()), 200)
    
    def delete(self, id):
        event = Event.query.filter_by(id = id).first()
        db.session.delete(event)
        db.session.commit()

        return {}, 200

api.add_resource(EventById, "/events/<int:id>") 

class Tickets(Resource):
    def get(self):
        tickets = [ticket.to_dict() for ticket in Ticket.query.all()]
        return make_response(jsonify(tickets), 200)
    
    def post(self):
        data = request.get_json()

        ticket = Ticket(
            quantity_tickets = data["quantity_tickets"],
            user_id= data["user_id"],
            event_id = data["event_id"]
        )
        db.session.add(ticket)
        db.session.commit()

        return make_response(jsonify(ticket.to_dict()), 201)


api.add_resource(Tickets, "/tickets")

class TicketById(Resource):
    def get(self, id):
        tickets = Ticket.query.filter_by(id = id).first()
        return make_response(jsonify(tickets.to_dict()), 200)
    
    def patch(self, id):
        ticket = Ticket.query.filter_by(id = id).first()

        for attr in request.form:
            setattr(ticket, attr, request.form[attr])
        db.session.add(ticket)
        db.session.commit()

        return make_response(jsonify(ticket.to_dict()), 200)

api.add_resource(TicketById, "/tickets/<int:id>")

class Payments(Resource):
    def get(self):
        payments = [payment.to_dict() for payment in Payment.query.all()]
        return make_response(jsonify(payments), 200)
    
    def post(self):
        data = request.get_json()
        new_payment=Payment(
            amount = data["amount"],
            ticket_id = data["ticket_id"]
        )
        db.session.add(new_payment)
        db.session.commit()

        return make_response(jsonify(new_payment.to_dict()), 201)

api.add_resource(Payments, "/payments")





if __name__ == "__main__":
    app.run(port=5555, debug=True)
