// // import React from 'react'
// import React, { useState } from 'react'

// function Ticket({ event }) {
//  const{title, date_time, ticket_price }=event
//     let [count, setCount] = useState(1);
//     console.log(count)
    
//     function handleIncrement() {
//         if (count < 10) {
//             setCount((prevCount) => prevCount + 1)
//         } else { setCount("Sold Out") }
//     }

//     function handleDecrement() {
//         if (count > 1) {
//             setCount((prevCount) => prevCount - 1);
//         }
//     }
//     let product = count * 100

//     return (
//         <div>
//             <h3>Ticket Checkout</h3>
//             <div>

//                 <p>Event Name:{title} </p>
//                 <p>Ticket Number:</p>
//                 <p>Event Date:{date_time}</p>
//                 <p>Price: {ticket_price}</p>
//                 <p>No.of Tickets</p>
//                 <button onClick={handleIncrement}> <span> + </span></button>
//                 <span> {count} </span>
//                 <button onClick={handleDecrement}><span> - </span></button>
//             </div>
//             <div>
//                 <img src="" alt="poster" />
//                 <h5>Order Summary</h5>
//                 <p>{count} * 100: </p>
//                 <p>Total: {product}</p>


//             </div>



//         </div>
//     )
// }

// export default Ticket
