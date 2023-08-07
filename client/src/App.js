import React, { useEffect, useState } from 'react';
import { Routes,Route} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import EventList from './components/EventList';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import AddEventForm from './components/AddEventForm';
import TicketCheckout from './components/TicketCheckout';
import PaymentConfirmation from './components/PaymentConfirmation';
import UpdateEventForm from './components/UpdateEventForm';

function App() {
  const[events, setEvents]= useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authenticatedUser, setAuthenticatedUser] = useState(null)

  // console.log(events)
  useEffect(()=>{   
    fetch("/events")
    .then(resp=> resp.json())
    .then(events=> setEvents(events))
  }, [])

  
  function handleAddEvent(newEvent) {
    setEvents([...events,newEvent])
  }


  function handleSuccessfulLogin(data) {
    setIsLoggedIn(true)
    setAuthenticatedUser(data.user_id)
    localStorage.setItem("access_token", data.token)
  }
  // console.log(authenticatedUser)


  
  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <main>
        <Routes>
          <Route exact path="/" element = {<EventList events={events} user={authenticatedUser} setEvents={setEvents}/>} />
          <Route path="/:id" element ={<TicketCheckout/> }/>
          <Route path="/newevent" element={<AddEventForm handleAddEvent={handleAddEvent}  isLoggedIn={isLoggedIn}/>} />
          <Route path="/login" element={<Login onLogin={handleSuccessfulLogin}/>} isLoggedIn={isLoggedIn} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/:id/checkout/:product" element={<PaymentConfirmation />} />
          <Route path="/:id/update"  element={<UpdateEventForm events={events} setEvents={setEvents} />}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
