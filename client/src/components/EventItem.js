import React, {useState, useEffect} from 'react'
import TicketCheckout from './TicketCheckout'
// import {  Routes, Route,Link} from 'react-router-dom'
// import { Link } from 'react-router-dom'



const EventItem = ({ keyId,event }) => {
    // console.log(event)
    const {id, title, venue, description, organizer, image_url, category, ticket_price, available_tickets,  date_time } = event
    // tickets_sold,

    const [selectedEvent, setSelectedEvent] = useState(null);

    const navigate= useNavigate()
    useEffect(() => {

        fetch(`/events/${id}`)
            .then(resp => resp.json())
            .then(events => setSelectedEvent(events))
    }, [id])

    function handleBuyTicket(id){
        
        console.log(selectedEvent)
    }



    return (
        <div>
            <h3> Title:{title}</h3>
            <img src={image_url} alt="poster" />
            <h4> Venue: {venue}</h4>
            <p> Description: {description}</p>
            <p> Organizer: {organizer}</p>
            <p>Category:{category}</p>
            <p>Ticket Price: {ticket_price}</p>
            <p> Available Tickets: {available_tickets}</p>
            <p> Remaining Tickets: </p>
            <p>Event Time: {date_time}</p>
            <div>
                
                {/* <Routes>
                    <Route path="/checkout" element={<TicketCheckout />}/>

                </Routes> */}
                <Link to={`/${keyId}`}>more info</Link>
                {/* <Link to ="/checkout" > <button id="buy" onClick={handleBuyTicket} > Buy Ticket </button></Link> */}
            </div>

            

            


        </div>
    )
}

export default EventItem