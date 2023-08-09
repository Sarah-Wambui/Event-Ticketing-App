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
        <div className='card'>
           <div className='poster'><img src={image_url} alt="poster" />
            </div> 

            <h3> Title:{title}</h3>
            <p>Event Time: {date_time}</p>
            <h4> Venue: {venue}</h4>
            <div className='details'>
            <p> Description: {description}</p>
            <p> Organizer: {organizer}</p>
            <p>Category:{category}</p>
            <p>Ticket Price: {ticket_price}</p>
            <p> Available Tickets: {available_tickets}</p>
            <p> Remaining Tickets: </p>
            <div className='ticket'>

{user === user_id ? (<> <Link to={{ pathname: `/${id}/update`, state: { event } }}><button >Update</button></Link> <button onClick={() => handleDelete(id)}>Delete</button> </>) :  (<Link to ={`/${id}` }> <button id="buy"  > Buy Ticket </button></Link> )}

{/*  */}
</div>
            </div>
           
        </div>
    )
}

export default EventItem