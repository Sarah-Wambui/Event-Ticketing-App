import React from 'react'
import EventItem from "./EventItem"

const EventList = ({ events }) => {

    const fetchedEvent = events.map((event) => (
        // console.log(event)
        <EventItem key={event.id} event={event} />

    )


    )
    return (
        <div>
            {fetchedEvent}
        </div>
    )
}

export default EventList