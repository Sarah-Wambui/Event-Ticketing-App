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
            <div>
                <div className='title'>Title: {title}</div>
                <div className='event-time'>Event Time: {date_time}</div>
                <div className='venue'>Venue: {venue}</div>
            </div>
            <div className='details'>
                <div className='detail-item'>
                    <span className='label'>Description:</span>
                    <p className='content'>{description}</p>
                </div>
                <div className='detail-item'>
                    <span className='label'>Organizer:</span>
                    <p className='content'>{organizer}</p>
                </div>
                <div className='detail-item'>
                    <span className='label'>Category:</span>
                    <p className='content'>{category}</p>
                </div>
                <div className='detail-item'>
                    <span className='label'>Ticket Price:</span>
                    <p className='content'>{ticket_price}</p>
                </div>
                <div className='detail-item'>
                    <span className='label'>Available Tickets:</span>
                    <p className='content'>{available_tickets}</p>
                </div>
                <div className='detail-item'>
                    <span className='label'>Remaining Tickets:</span>
                    <p className='content'></p>
                </div>
                    <div className='ticket'>
                        {user === user_id ? (
                          <>
                            <Link to={{ pathname: `/${id}/update`, state: { event } }}>
                                <button className='update-btn' >Update</button>
                            </Link> 
                            <button className='delete-btn' onClick={() => handleDelete(id)}>Delete</button> 
                          </>
                        ) : (
                            <Link to ={`/${id}` }> 
                                <button className="fancy">
                                    <span className="top-key"></span>
                                    <span className="text">Buy Tickets</span>
                                    <span className="bottom-key-1"></span>
                                    <span className="bottom-key-2"></span>
                                </button>
                            </Link> 
                        )}
                        {/*  */}
                    </div>
            </div>
        </div>
    )
}

export default EventItem