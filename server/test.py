from models import Event
from config import app

with app.app_context():
    print(Event.query.all())