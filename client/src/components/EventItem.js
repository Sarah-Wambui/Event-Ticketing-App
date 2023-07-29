import React from 'react'



const EventItem = ({ event }) => {
    const { title, venue, description, organizer, image_url, category, ticket_price, available_tickets, tickets_sold, date_time } = event

    return (
        <div>
            <h3> Title:{title}</h3>
            <img src={image_url} alt="poster" />
            <h4> Venue: {venue}</h4>
            <p> Description: {description}</p>
            <p> Organzer: {organizer}</p>
            <p>Category:{category}</p>
            <p>Ticket Price: {ticket_price}</p>
            <p> Available Tickets: {available_tickets}</p>
            <p> Remaining Tickets: </p>
            <p>Event Time: {date_time}</p>
            <div>
                <button id="buy"> Buy Ticket </button>
            </div>


        </div>
    )
}

export default EventItem