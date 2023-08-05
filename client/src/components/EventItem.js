import React from 'react'
import { Link } from 'react-router-dom'



const EventItem = ({ event }) => {
    const {id, title, venue, description, organizer, image_url, category, ticket_price, available_tickets,  date_time } = event
    // tickets_sold,

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
                <Link to ={`/${id}` }> <button id="buy"  > Buy Ticket </button></Link>
            </div>
        </div>
    )
}

export default EventItem