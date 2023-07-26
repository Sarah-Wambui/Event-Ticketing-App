from config import app, db, api
from flask_restful import Resource
from models import User, Event, Ticket, Payment, Purchase

class Home(Resource):
    def get(self):
        return "message: Welcome to Event Ticketing"
api.add_resource(Home, "/")


if __name__ == "__main__":
    app.run(port=5555, debug=True)