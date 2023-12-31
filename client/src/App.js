import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EventList from "./components/EventList";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import About from "./components/About";
import AddEventForm from "./components/AddEventForm";
import TicketCheckout from "./components/TicketCheckout";
import PaymentConfirmation from "./components/PaymentConfirmation";
import UpdateEventForm from "./components/UpdateEventForm";
import Footer from "./components/Footer";

function App() {
  const [events, setEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null)

  // console.log(events)
  useEffect(() => {
    fetch("/events")
      .then((resp) => resp.json())
      .then((events) => setEvents(events));

    // validate token
    fetch("/token/validate", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    }).then((res) => {
      setLoading(false);
      if (res.status === 401) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });
  }, []);

 
  function handleAddEvent(newEvent) {
    setEvents([...events, newEvent]);
  }

  function handleSuccessfulLogin(data) {
    setIsLoggedIn(true);
    setAuthenticatedUser(data.user_id);
    setEmail(data.email)
    localStorage.setItem("access_token", data.token);
  }
  // console.log(authenticatedUser)

  return (
    <div className="App">
      {loading ? (
        "loading ..."
      ) : (
        <>
         
          <NavBar isLoggedIn={setAuthenticatedUser} email={email} />
          <Header />
          <main>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <EventList
                    events={events}
                    user={authenticatedUser}
                    setEvents={setEvents}
                  />
                }
              />
              <Route path="/:id" element={<TicketCheckout />} />
              <Route
                path="/newevent"
                element={
                  <AddEventForm
                    handleAddEvent={handleAddEvent}
                    isLoggedIn={authenticatedUser}
                  />
                }
              />
              <Route
                path="/login"
                element={<Login onLogin={handleSuccessfulLogin} />}
                isLoggedIn={isLoggedIn}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/:id/checkout/:product/:remaining_tickets"
                element={<PaymentConfirmation events={events} setEvents={setEvents}  isLoggedIn={authenticatedUser}/>}
              />
              <Route
                path="/:id/update"
                element={
                  <UpdateEventForm events={events} setEvents={setEvents} />
                }
              />
            </Routes>
          </main>
          <Footer/>
        </>
      )}
    </div>
  );
}

export default App;
