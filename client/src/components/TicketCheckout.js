import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
// import PaymentConfirmation from './PaymentConfirmation';

function TicketCheckout() {
    // const { title,  date_time, ticket_price } = event
    let [count, setCount] = useState(1);
    // console.log(count)
    const {id}=useParams()
    // console.log(id)
    const [checkout, setCheckout]= useState([])
    // console.log(checkout)

    useEffect(() => {

        fetch(`/events/${id}`)
            .then(resp => resp.json())
            .then(events => setCheckout(events))
    }, [id])

    function handleIncrement() {
        if (count < 10) {
            setCount((prevCount) => prevCount + 1)
        } else { setCount("Sold Out") }
    }

    function handleDecrement() {
        if (count > 1) {
            setCount((prevCount) => prevCount - 1);
        }
    }
    let product = count * checkout.ticket_price

    return (
        <div>
            <h3>Ticket Checkout</h3>
            <div>

                <p>Event Name:{checkout.title} </p>
                <p>Ticket Number:{checkout.id}</p>
                <p>Event Date:{checkout.date_time}</p>
                <p>Price: {checkout.ticket_price}</p>
                <p>No.of Tickets{checkout.available_tickets}</p>
                <button onClick={handleIncrement}> <span> + </span></button>
                <span> {count} </span>
                <button onClick={handleDecrement}><span> - </span></button>
            </div>
            <div>
                <img src="" alt="poster" />
                <h5>Order Summary</h5>
                <p>{count} * {checkout.ticket_price}: </p>
                <p>Total: {product}</p>
                {/* <PaymentConfirmation product={product} /> */}
                <Link to= {`/:${id}/checkout/${product}`}><button>CHECKOUT</button></Link>
                

            </div>
        </div>
    )
}

export default TicketCheckout














// // import React from 'react'
// import React from 'react'
// import Ticket from './Ticket'

// function TicketCheckout({events}) {
//     const ticket= events.map(( event)=>{
//         return <Ticket key = {event.id} event= {event} />
//     })
// return(
//     <div> {ticket}</div>
// )
// }
// export default TicketCheckout


