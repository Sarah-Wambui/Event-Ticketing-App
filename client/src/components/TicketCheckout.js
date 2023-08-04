// import React from 'react'
import React from 'react'
import Ticket from './Ticket'

function TicketCheckout({events}) {
    

    const ticket= events.map(( event)=>{

        return <Ticket keyId = {event.id} event= {event} events={events}/>
    })


return(
    <div> 
    {ticket}
    
    </div>
    
)

}

export default TicketCheckout
