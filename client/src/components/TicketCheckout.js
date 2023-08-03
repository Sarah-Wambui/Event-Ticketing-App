// import React from 'react'
import React from 'react'
import Ticket from './Ticket'

function TicketCheckout({events}) {
    

    const ticket= events.map(( event)=>{

        return <Ticket key = {event.id} event= {event} />
    })


return(
    <div> 
    {ticket}
    
    </div>
    
)

}

export default TicketCheckout
