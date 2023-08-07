from config import app, db, api
from flask_restful import Resource
from models import User, Event, Ticket
from flask import make_response, jsonify, request
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token, jwt_required , get_jwt_identity , get_jwt
from flask_mail import Message
from config import mail
import requests
from requests.auth import HTTPBasicAuth
from datetime import datetime
import base64
import cloudinary

          
cloudinary.config( 
  cloud_name = "degeu8i1o", 
  api_key = "416435438684123", 
  api_secret = "dX_5_uw8boFR9DFi94aolYCiRCw" 
)



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

        try:
            db.session.add(user)
            db.session.commit()


            # msg = Message('Hello from the other side!',
            #      sender =   'rogonykiplagat@gmail.com', 
            #      recipients = [email])
            # msg.body = "Your account is created successfully"
            # mail.send(msg)

            # return "Message sent"
            print(user.to_dict())
            return make_response(jsonify(user.to_dict()), 201)
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
            metadata = {
                "is_attendee": user.is_attendee,
                "username": user.username
            }
            token = create_access_token(identity=user.id , additional_claims=metadata)
            print({"token":token})
            return jsonify({"token":token, "user_id":user.id})
        return make_response(jsonify({"error": "Invalid details"}), 401)

api.add_resource(Login, "/login")


@app.route("/common")
@jwt_required()
def common():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user.is_attendee:
        user.is_attendee = False
        return "I am now an organizer"
    return "I am still an attendee"

class Events(Resource):
    def get(self):
        # events = [event.to_dict() for event in Event.query.all()]
        events = []
        for event in Event.query.all():
            events.append(event.to_dict())
        return make_response(jsonify(events), 200)
    

    @jwt_required()
    def post(self):
        events = request.get_json()
        current_user_id = get_jwt_identity()

    # Find the user by ID
        user = User.query.get(current_user_id)
        if user.is_attendee:
            user.is_attendee = False
            db.session.commit()

        new_event= Event(
            title=events["title"],
            venue=events["venue"],
            description= events["description"],
            organizer=user.username,
            category =events["category"],
            image_url = events["image_url"],
            ticket_price=events["ticket_price"],
            available_tickets=events["available_tickets"],
            date_time=events["date_time"],
            user_id=current_user_id,
        )
        db.session.add(new_event)
        db.session.commit()
        return make_response(jsonify(new_event.to_dict()), 201)
api.add_resource(Events, "/events")


class EventById(Resource):
    def get(self, id):
        event= Event.query.filter_by(id=id).first()
        return make_response(jsonify(event.to_dict()), 200)
    

    @jwt_required()
    def patch(self, id):
        event= Event.query.filter_by(id=id).first()

        current_user_id = get_jwt_identity() 
        user = User.query.get(current_user_id)
        if user.is_attendee:
            user.is_attendee = False
            db.session.commit() 

        for attr in request.form:
            setattr(event, attr, request.form[attr])
        db.session.add(event)
        db.session.commit()

        return make_response(jsonify(event.to_dict()), 200)
    
    @jwt_required()
    def delete(self, id):
        event = Event.query.filter_by(id = id).first()

        current_user_id = get_jwt_identity() 
        user = User.query.get(current_user_id)
        if user.is_attendee:
            user.is_attendee = False
            db.session.commit()

        db.session.delete(event)
        db.session.commit()

        return {}, 200

api.add_resource(EventById, "/events/<int:id>") 




# get access token from mpesa
def getAccesstoken():
    consumer_key = 'i63wJ4CwjhfNcDuUVHQ7jx4YlymOhXC5'
    consumer_secret = 'Gvf54kDwZN2a0gHf'
    endpoint = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    data =(requests.get(endpoint, auth = HTTPBasicAuth(consumer_key, consumer_secret))).json()
    print(data)
    return data["access_token"]

base_url = 'https://e90b-196-216-65-2.ngrok-free.app'
request_bin_url = "https://enq9mf0wmqf8.x.pipedream.net/payments"

# initiate M-PESA Express

@app.route("/pay/<int:event_id>", methods=["POST"])
def MpesaExpress():
    # amount = request.args.get("amount")
    phone = request.args.get("phone")
    data = request.get_json()
    amount = data.get("amount")
    phone = data.get("phone")

    endpoint = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    access_token = getAccesstoken()
    print(access_token)
    headers = {"Authorization": "Bearer %s" % access_token}
    Timestamp = datetime.now()
    times = Timestamp.strftime("%Y%m%d%H%M%S")
    password = "174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + times
    datapass = base64.b64encode(password.encode('utf-8')).decode('utf-8')
    my_endpoint = base_url + "/payments"

    data = {
        "BusinessShortCode": "174379",
        "Password": datapass,
        "Timestamp": times,
        "TransactionType": "CustomerPayBillOnline",
        "PartyA": phone,  # fill with your phone number
        "PartyB": "174379",
        "PhoneNumber": phone,  # fill with your phone number
        "CallBackURL": request_bin_url,
        "AccountReference": "TestPay",
        "TransactionDesc": "HelloTest",
        "Amount": amount
    }

    res = requests.post(endpoint, json=data, headers=headers).json()
    print(res)
    return res


@app.route('/tickets', methods=['POST'])
def incoming():
    data = request.get_json()
    print(data)
    amount = data.get("Body", {}).get("stkCallback", {}).get("CallbackMetadata", {}).get("Item", [])[0].get("Value")
    phone_number = data.get("Body", {}).get("stkCallback", {}).get("CallbackMetadata", {}).get("Item", [])[4].get("Value")


    # Find the user and event based on phone_number and other relevant data
    user = User.query.filter_by(phone_number=phone_number).first()
    event = Event.query.filter_by(id = id).first()

    # Save the data to the database
    if amount and phone_number:
        ticket = Ticket(
            amount=amount,
            phone_number= phone_number, 
            user_id=user.id, 
            event_id=event.id
        )  # Replace user_id and event_id with appropriate values
        db.session.add(ticket)
        db.session.commit()

    return "ok"





if __name__ == "__main__":
    app.run(port=5555, debug=True)

