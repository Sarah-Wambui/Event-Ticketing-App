# from faker import Faker
# from app import app
# from models import User, Event, Payment, event_users
# from config import db
# from random import choice as rc, randint

# fake = Faker()
# with app.app_context():
#     User.query.delete()
#     Event.query.delete()
#     # Ticket.query.delete()
#     Payment.query.delete()
#     # Purchase.query.delete()

#     events = []
#     images = [
#         "https://i.pinimg.com/1200x/e4/65/2c/e4652c7aa9d3686b95d707f9c63df77b.jpg", 
#         "https://i.pinimg.com/564x/fa/46/c6/fa46c688f06c50b4118ff72bdd6341a7.jpg", 
#         "https://i.pinimg.com/originals/e5/95/3a/e5953acfdd9f3bf5a488181e01f08df8.jpg", 
#         "https://i.pinimg.com/564x/28/8c/fc/288cfc8f5dbcbee53bfa2723ddf32d6c.jpg", 
#         "https://i.pinimg.com/564x/28/8c/fc/288cfc8f5dbcbee53bfa2723ddf32d6c.jpg", 
#         "https://i.pinimg.com/736x/7e/67/92/7e67929613e55564fe59207b3edb0da4--carnival-ideas-event-posters.jpg", 
#         "https://i.pinimg.com/564x/7b/ca/fe/7bcafe0c277530273a0e17ec374b66b4.jpg",
#     ]
#     categories = ["Education", "Health", "Film", "Art and crafts", "Networking", "Technology", "Music", "Food and Wine", "Outdoors"]
#     for n in range(10):
#         event = Event(
#             title=fake.sentence(),
#             venue=fake.city(),
#             description=fake.paragraph(),
#             category=rc(categories),
#             organizer=fake.name(),
#             image_url=rc(images),
#             ticket_price=randint(500, 10000),
#             available_tickets=randint(1, 50),
#             tickets_sold= randint(5, 20),
#             ticket_number=randint(1000, 20000),
#             date_time =fake.date_time()
#         )
#         events.append(event)
#     db.session.add_all(events)


#     users = []
#     for n in range(10):
#         user = User(
#             username=fake.name(), 
#             email=fake.email(), 
#             _password_hash=fake.password()
#         )
#         users.append(user)
#     db.session.add_all(users)


#     payments = []
#     for user in users:
#         for n in range(10):
#             payment = Payment(
#             amount=randint(1000, 10000),
#             user_id=randint(1,10),
#             event_id=randint(1, 10)
#         )
#         payments.append(payment)
#     db.session.add_all(payments)

#     for event in events:
#         p = rc(payments)
#         event.payment = p
#         payments.remove(p)

#     combinations = set()
#     for _ in range(10):
#         user_id = randint(1, 10)
#         event_id = randint(1, 10)
#         if (user_id, event_id) in combinations:
#             continue
#         combinations.add((user_id, event_id))
#         event_user_data = {"user_id": user_id, "event_id": event_id}
#         statement = db.insert(event_users).values(event_user_data)
#         db.session.execute(statement)
#         db.session.commit()
#     db.session.commit()
   



       # tickets = []
    # for user in users:
    #     for n in range(10):
    #         ticket = Ticket(
    #         user_id=randint(1,10),
    #         event_id=randint(1,10)
    #     )
    #     tickets.append(ticket)
    # db.session.add_all(tickets)




    # purchases = []
    # for n in range(10):
    #     purchase = Purchase(
    #         ticket_id=randint(1,10)
    #     )
    #     purchases.append(purchase)
    # db.session.add_all(purchases)
    
    
from faker import Faker
from app import app
from models import User, Event, Payment, event_users
from config import db
from random import choice as rc, randint

fake = Faker()
with app.app_context():
    User.query.delete()
    Event.query.delete()
    # Ticket.query.delete()
    Payment.query.delete()
    # Purchase.query.delete()

    events = []
    images = [
        "https://i.pinimg.com/1200x/e4/65/2c/e4652c7aa9d3686b95d707f9c63df77b.jpg", 
        "https://i.pinimg.com/564x/fa/46/c6/fa46c688f06c50b4118ff72bdd6341a7.jpg", 
        "https://i.pinimg.com/originals/e5/95/3a/e5953acfdd9f3bf5a488181e01f08df8.jpg", 
        "https://i.pinimg.com/564x/28/8c/fc/288cfc8f5dbcbee53bfa2723ddf32d6c.jpg", 
        "https://i.pinimg.com/564x/28/8c/fc/288cfc8f5dbcbee53bfa2723ddf32d6c.jpg", 
        "https://i.pinimg.com/736x/7e/67/92/7e67929613e55564fe59207b3edb0da4--carnival-ideas-event-posters.jpg", 
        "https://i.pinimg.com/564x/7b/ca/fe/7bcafe0c277530273a0e17ec374b66b4.jpg",
    ]
    categories = ["Education", "Health", "Film", "Art and crafts", "Networking", "Technology", "Music", "Food and Wine", "Outdoors"]
    for n in range(10):
        event = Event(
            title=fake.sentence(),
            venue=fake.city(),
            description=fake.paragraph(),
            category=rc(categories),
            organizer=fake.name(),
            image_url=rc(images),
            ticket_price=randint(500, 10000),
            available_tickets=randint(1, 50),
            tickets_sold= randint(5, 20),
            ticket_number=randint(1000, 20000),
            date_time =fake.date_time()
        )
        events.append(event)
    db.session.add_all(events)


    users = []
    for n in range(10):
        user = User(
            username=fake.name(), 
            email=fake.email(), 
            _password_hash=fake.password()
        )
        users.append(user)
    db.session.add_all(users)


    payments = []
    for user in users:
        for n in range(10):
            payment = Payment(
            amount=randint(1000, 10000),
            user_id=randint(1,10),
            event_id=randint(1, 10)
        )
        payments.append(payment)
    db.session.add_all(payments)

    for event in events:
        p = rc(payments)
        event.payment = p
        payments.remove(p)


    combinations = set()
    for _ in range(10):
        user_id = randint(1, 10)
        event_id = randint(1, 10)
        if (user_id, event_id) in combinations:
            continue
        combinations.add((user_id, event_id))
        event_user_data = {"user_id": user_id, "event_id": event_id}
        statement = db.insert(event_users).values(event_user_data)
        db.session.execute(statement)
        db.session.commit()
    db.session.commit()