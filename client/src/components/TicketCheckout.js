import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';

function TicketCheckout() {
    let [count, setCount] = useState(1);
    const [checkout, setCheckout]= useState([])
    console.log(count)
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
    let remaining_tickets = checkout.available_tickets - count
    console.log(remaining_tickets)

    return (
        <div className="checkout-container">
          <h3>Ticket Checkout</h3>
          <div className="checkout-summary">
            <div className="checkout-image-container">
              <img src={checkout.image_url} alt="poster" className="checkout-image" />
            </div>
            <div className="details-separator"></div>
            <div className="checkout-details">
              <div className="event-detail">
                <label>Event Name:</label>
                <span>{checkout.title}</span>
              </div>
              <div className="event-detail">
                <label>Ticket Number:</label>
                <span>{checkout.id}</span>
              </div>
              <div className="event-detail">
                <label>Event Date:</label>
                <span>{checkout.date_time}</span>
              </div>
              <div className="event-detail">
                <label>Price:</label>
                <span>{checkout.ticket_price}</span>
              </div>
            </div>
            <div className="ticket-count">
              <button className="count-button" onClick={handleDecrement}>-</button>
              <span>{count}</span>
              <button className="count-button" onClick={handleIncrement}>+</button>
            </div>
            <div className="details-separator"></div>
            <div className="order-summary">
              <h5>Order Summary</h5>
              <p>
                {count} * {checkout.ticket_price}:
              </p>
              <p>Total: {product}</p>
              <Link to= {`/${id}/checkout/${product}/${remaining_tickets}`}><button>CHECKOUT</button></Link>
            </div>
          </div>
        </div>
      );
}

export default TicketCheckout