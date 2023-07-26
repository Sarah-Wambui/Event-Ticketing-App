from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
import datetime

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    events = db.relationship("Event", backref="user")
    purchases = db.relationship("Purchase", backref="user")

    @hybrid_property
    def password_hash(self):
        return AttributeError("Password should not be seen")
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    
    def __repr__(self):
        return f"User {self.username}."
    
class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    venue = db.Column(db.String)
    description = db.Column(db.String)
    category=db.Column(db.String)
    organizer = db.Column(db.String)
    image_url = db.Column(db.String)
    ticket_price = db.Column(db.Integer)
    available_tickets = db.Column(db.Integer)
    date_time = db.Column(db.DateTime, server_default=db.func.now())
    # date_time = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow().strftime('%Y-%m-%d %I:%M '))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    tickets = db.relationship("Ticket", backref="event")

    def __repr__(self):
        return f"Event {self.title} will be held at {self.venue}"
    
    # print(date_time)

class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id= db.Column(db.Integer, primary_key=True)
    user_id= db.Column(db.Integer, db.ForeignKey("users.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    purchases = db.relationship("Purchase", backref="ticket")

    def __repr__(self):
        return f"Ticket {self.id}" 
    
class Purchase(db.Model, SerializerMixin):
    __tablename__ = "purchases"

    id = db.Column(db.Integer, primary_key=True)
    quantity_tickets = db.Column(db.Integer)
    ticket_id = db.Column(db.Integer, db.ForeignKey("tickets.id"))
    user_id= db.Column(db.Integer, db.ForeignKey("users.id"))
    date_time = db.Column(db.DateTime, server_default=db.func.now())
    payments = db.relationship("Payment", backref="purchase", uselist=False) 

    def __repr__(self):
        return f"Purchase is {self.quantity_tickets}"

class Payment(db.Model, SerializerMixin):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    purchase_id = db.Column(db.Integer, db.ForeignKey("purchases.id"))

    def __repr__(self):
        return f"Payment {self.amount}"



