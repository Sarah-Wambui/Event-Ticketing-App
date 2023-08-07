import React from 'react'
import { Link } from 'react-router-dom'
// import UpdateEventForm from "./UpdateEventForm"



const EventItem = ({ user, event, setEvents, events }) => {
    const {id, title, venue, description, organizer, image_url, category, ticket_price, available_tickets,  date_time , user_id} = event
    // tickets_sold,

    function handleDelete(id){
        console.log(id)
        fetch(`/events/${id}`,{
            method: "DELETE",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("access_token")
              },
        })
        .then(resp => resp.json())
        .then(() => {
            const updatedEvents = events.filter((event) => event.id !== id)
            setEvents(updatedEvents)
        })
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

                {user === user_id ? (<> <Link to={`/${id}/update`} ><button >Update</button></Link> <button onClick={() => handleDelete(id)}>Delete</button> </>) :  (<Link to ={`/${id}` }> <button id="buy"  > Buy Ticket </button></Link> )}
                
                {/*  */}
            </div>
        </div>
    )
}

export default EventItem