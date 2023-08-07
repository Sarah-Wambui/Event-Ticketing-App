from config import db, bcrypt
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin

# event_users = db.Table(
#     "event_user",
#     db.Column("user_id", db.ForeignKey("users.id"), primary_key=True),
#     db.Column("event_id", db.ForeignKey("events.id"), primary_key=True),
#     extend_existing=True,
# )


class User(db.Model, SerializerMixin):
    __tablename__ = "users"


    # serialize_rules =("_password_hash", "-events.user",)


    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    is_attendee = db.Column(db.Boolean, default=True)
    # payments = db.relationship("Ticket", backref="user")
    # events= db.relationship("Event", backref="user")



    @hybrid_property
    def password_hash(self):
        raise AttributeError("Password hashes may not be viewed.")
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

    # serialize_rules = ("-user.events",)
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    venue = db.Column(db.String)
    description = db.Column(db.String)
    category=db.Column(db.String)
    organizer = db.Column(db.String)
    image_url = db.Column(db.String, nullable=True)
    ticket_price = db.Column(db.Integer)
    available_tickets = db.Column(db.Integer)
    tickets_sold = db.Column(db.Integer)
    date_time = db.Column(db.String)
    # payments = db.relationship("Ticket", backref="event")
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user= db.relationship("User", backref="events", lazy=True)
    # upload = db.relationship("Upload", backref="event", uselist=False)

    def to_dict(self):
        return {
            "id":self.id,
            "title": self.title,
            "venue": self.venue,
            "description": self.description,
            "category": self.category,
            "organizer": self.organizer,
            "image_url": self.image_url,
            "ticket_price": self.ticket_price,
            "available_tickets":self.available_tickets,
            "ticket_sold": self.tickets_sold,
            "date_time": self.date_time,
            "user_id": self.user_id
        }

    def __repr__(self):
        return f"Event {self.title} will be held at {self.venue}"

class Ticket(db.Model, SerializerMixin):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    user= db.relationship("User", backref="tickets", lazy=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
    event= db.relationship("Event", backref="tickets", lazy=True)
    ticket_number = db.Column(db.Integer, autoincrement=True)
    amount = db.Column(db.Integer)
    phone_number = db.Column(db.String)

    # serialize_rules = ("-user.tickets", "-event.tickets",)


    def __repr__(self):
        return f"Tickect {self.ticket_number}."
    

# class Upload(db.Model,SerializerMixin):
#     __tablename__ = "uploads"

#     id = db.Column(db.Integer, primary_key=True)
#     image = db.Column(db.String)
#     event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
#     # event = db.relationship("Event", backref="upload", uselist=False)
    
# class Stk_push():

#     user_id= db.Column(db.Integer)
#     event_id=db.Column(db.Integer)
#     request_id=
#     amount
#     phone_number
#     descrption
    

# class Payment(db.Model, SerializerMixin):
#     __tablename__ = "payments"

#     id = db.Column(db.Integer, primary_key=True)
#     amount = db.Column(db.Integer)
#     phone_number = db.Column(db.String)
#     user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
#     event_id = db.Column(db.Integer, db.ForeignKey("events.id"))
#     serialize_rules = ("-user.payments", "-event.payments",)

#     def __repr__(self):
#         return f"Payment {self.amount}"
    




