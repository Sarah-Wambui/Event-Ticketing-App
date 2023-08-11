# EventGo App
## Table of Contents
Description
Features
Installation
Usage
Configuration
Components
Contributing
License
## Description
The Event Ticketing App is a React.js and Python-based web application that allows users to browse, purchase, and manage tickets for various events. It provides a user-friendly interface for both event organizers and attendees to facilitate event ticketing and management.
## Features
Browse a list of upcoming events.
View event details including date, time, location, and ticket prices.
Register an account as an attendee or organizer.
Purchase tickets for events using secure payment methods.
Organizers can create and manage events, set ticket prices, and view attendee lists.
Attendees can view purchased tickets and event details.
User authentication and authorization to ensure data security.
Responsive and intuitive user interface.
## Installation
Clone the repository:
bash
Copy code
** git clone git@github.com:Sarah-Wambui/Event-Ticketing-App.git **
cd Event-Ticketing-App
Install the required dependencies:
bash
Copy code
pip install -r requirements.txt
Usage
Run the development server:
bash
Copy code
python app.py
Access the app by opening your web browser and navigating to http://localhost:5000.
## Configuration
The app's configuration is managed through the config.py file.
## Models
models.py
This file defines the database models used in the app using SQLAlchemy. It includes models such as:
User: Represents users with properties like username, email, and password hash. Provides methods for password hashing and authentication.
Event: Defines event details such as title, venue, description, ticket price, etc. Includes a serialization method to_dict().
Ticket: Represents purchased tickets with attributes like user_id, event_id, ticket number, and amount.
## API Endpoints
### POST /signup
Description: Allows users to register for the app.
Input: User's username, email, and password.
Output: Returns a newly created user profile upon successful registration.
### POST /login
Description: Enables users to log into the app.
Input: User's email and password.
Output: Generates a JWT token for authenticated interactions.
### GET /users
Description: Retrieves a list of all registered users.
Output: Returns a JSON array of user profiles.
### GET /users/:id
Description: Retrieves detailed information about a specific user.
Input: User's ID.
Output: Returns a JSON object with user details.
### GET /events
Description: Fetches a list of upcoming events.
Output: Returns a JSON array containing event details.
### POST /events
Description: Allows organizers to create new events.
Input: Event details including title, venue, description, etc.
Output: Returns the created event upon successful creation.
### GET /events/:id
Description: Retrieves detailed information about a specific event.
Input: Event's ID.
Output: Returns a JSON object with event details.
### PATCH /events/:id
Description: Enables organizers to update event details.
Input: Updated event attributes such as title, description, etc.
Output: Returns the updated event upon successful modification.
### DELETE /events/:id
Description: Allows organizers to delete an event.
Input: Event's ID.
Output: Responds with a success message upon successful deletion.
### POST /pay/:event_id
Description: Initiates mobile payment for ticket purchases.
Input: Payment amount and phone number.
Output: Returns payment details and status.
### POST /upload
Description: Handles image uploads for events using Cloudinary.
Input: Image file to be uploaded.
Output: Returns Cloudinary upload result.
### GET /token/validate
Description: Validates the authenticity of a JWT token.
Input: JWT token in the request header.
Output: Responds with token validation status.
Components React.js Front End
### Signup
The Signup component handles user registration. Users can create an account by providing their username, email, and password. It integrates with the backend to securely store user data.
#### Login
The Login component facilitates user authentication. Users can log in using their registered email and password. Upon successful login, the app generates a JWT token for subsequent authenticated interactions.
#### EventsList
The EventsList component displays a list of upcoming events. Users can explore event details such as title, venue, and ticket prices. It provides a snapshot of available events for users to choose from.
#### AddEvent
The AddEvent component enables organizers to create new events. Organizers can input event details, including title, venue, description, and ticket prices. The component interacts with the backend to store event data.
#### UpdateEvent
The UpdateEvent component allows event organizers to modify existing events. Organizers can edit event attributes such as title, description, and ticket prices. It interfaces with the backend to update event information.
#### DeleteEvent
The DeleteEvent component empowers event organizers to remove events. Organizers can select an event for deletion, and the component communicates with the backend to remove the event from the database.
#### TicketCheckout
The TicketCheckout component handles the ticket purchasing process. Users can select an event and proceed to checkout, providing payment and contact information. It initiates mobile payments for ticket purchase.
#### Navbar
The Navbar component provides navigation functionality throughout the app. It includes links to important sections, facilitating seamless user movement and exploration.
#### Header
Has our Logo, Banner and Welcome message.
#### Footer
Gives a summary of our contact infomaration and copyrights.
#### Contributing
## Contributions are welcome! If you find a bug or want to add a new feature, please follow these steps:
Fork the repository.
Create a new branch: git checkout -b feature-name.
Make your changes and commit them: git commit -m "Add new feature".
Push to the branch: git push origin feature-name.
Create a pull request describing your changes.
License
This project is licensed under the EventGo License.
