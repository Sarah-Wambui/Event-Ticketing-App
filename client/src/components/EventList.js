import React from 'react'
import EventItem from "./EventItem"

const EventList = ({ events }) => {

    const fetchedEvent = events.map((event) => (
        
        <EventItem keyId={event.id} event={event} />

    )


    )

    
    return (
        <div>
            {fetchedEvent}
        </div>
    )
}

export default EventList