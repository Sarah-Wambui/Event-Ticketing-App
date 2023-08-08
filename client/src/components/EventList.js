import React from 'react'
import EventItem from "./EventItem"

const EventList = ({ events , user, setEvents}) => {

    const fetchedEvent = events.map((event, index) => (
        // console.log(event)
        <EventItem key={index} event={event} user={user} setEvents={setEvents} events={events} />
    ))

    
    return (
        <div className='event-container'>
            {fetchedEvent}
        </div>
    )
}

export default EventList