import React, { useEffect, useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import EventList from './components/EventList';
import NavBar from './components/NavBar';
import Header from './components/Header';
import About from './components/About';
import AddEventForm from './components/AddEventForm';

function App() {
  const[events, setEvents]= useState([])
  // console.log(events)
  
  useEffect(()=>{
   
    fetch("/events")
    .then(resp=> resp.json())
    .then(events=> setEvents(events))
  }, [])

  
  return (
    <div className="App">
      <Header/>
      <NavBar/>
      <main>
        <Routes>
          <Route exact path="/" element = {<EventList events={events}/>} />
          <Route path="/login" element={<Login  />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newevent" element={<AddEventForm />} />
          <Route path="/about" element={<About />} />
        </Routes>

      </main>
 
    </div>
  )
}

export default App;
