import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

function TicketCheckout() {
    let [count, setCount] = useState(1);
    const [checkout, setCheckout]= useState([])
    // console.log(count)
    const {id}=useParams()
    // console.log(id)
   
    useEffect(() => {
        fetch(`/events/${id}`)
            .then(resp => resp.json())
            .then(events => setCheckout(events))
    }, [id])

    // increment count by one
    function handleIncrement() {
        if (count < checkout.available_tickets) {
            setCount((prevCount) => prevCount + 1)
        } else { setCount("Sold Out") }
    }

    // decrease count by one
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
                {/* <p>Tickets: {count}</p> */}
                <button onClick={handleIncrement}> <span> + </span></button>
                <span> {count} </span>
                <button onClick={handleDecrement}><span> - </span></button>
            </div>
            <div>
                <img src={checkout.image_url} alt="poster" />
                <h5>Order Summary</h5>
                <p>{count} * {checkout.ticket_price}: </p>
                <p>Total: {product}</p>
                <Link to= {`/:${id}/checkout/${product}`}><button>CHECKOUT</button></Link>   
            </div>
        </div>
    )
}

export default TicketCheckout





