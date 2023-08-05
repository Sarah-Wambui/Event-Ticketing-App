from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

event_users = db.Table(
    "event_user",
    db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
    db.Column("event_id", db.ForeignKey("events.id"), primary_key=True),
    extend_existing=True,
)


class User(db.Model, SerializerMixin):
    __tablename__ = "users"


    serialize_rules =("_password_hash", "-events.users",)
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    is_attendee = db.Column(db.Boolean, default=True)
    payments = db.relationship("Payment", backref="user")

    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    
    def _repr_(self):
        return f"User {self.username}."
    
class Event(db.Model, SerializerMixin):
    __tablename__ = "events"

    serialize_rules = ("-users.events",)
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    venue = db.Column(db.String)
    description = db.Column(db.String)
    category=db.Column(db.String)
    organizer = db.Column(db.String)
    image_url = db.Column(db.String)
    ticket_price = db.Column(db.Integer)
    available_tickets = db.Column(db.Integer)
    tickets_sold = db.Column(db.Integer)
    ticket_number = db.Column(db.Integer, unique=True)
    date_time = db.Column(db.String)
    payments = db.relationship("Payment", backref="event")

    def _repr_(self):
        return f"Event {self.title} will be held at {self.venue}"
    

class Payment(db.Model, SerializerMixin):
    __tablename__ = "payments"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    phone_number = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    serialize_rules = ("-user.payments", "-event.payments",)

    def _repr_(self):
        return f"Payment {self.amount}"
    




