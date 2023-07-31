import React,{useState} from 'react'

function AddEventForm({handleAddEvent}) {
  const[eventData, setEventData] = useState({
    title:"",
    venue:"",
    description:"",
    category:"",
    organizer:"",
    image_url:"",
    ticket_price:"",
    available_tickets:"",
    tickets_sold:"",
    ticket_number:"",
    date_time:"",

  })
function handleSubmitForm(event) {
  event.preventDefault()
  fetch("/events",{
   method:"POST",
   headers:{
    "Content-Type":"application/json",
   },
   body:JSON.stringify(eventData),

  })
  .then((resp)=>resp.json())
  .then((newEvent)=>console.log(newEvent))
  setEventData({
    title:"",
    venue:"",
    description:"",
    category:"",
    organizer:"",
    image_url:"",
    ticket_price:"",
    available_tickets:"",
    tickets_sold:"",
    ticket_number:"",
    date_time:"",
  })



}
function handleChange(event) {
  const { name, value } = event.target;
  const newValue = value;
  setEventData((prevEventData) => ({
    ...prevEventData,
    [name]:newValue,
  }));
}




  return (
    <div>
      <form onSubmit={handleSubmitForm}> 
        <label> Title:</label>
        <input type="text" onChange={handleChange} name ="title" value={eventData.title}/> 
        <label> Venue</label>
        <input type="text" onChange={handleChange} name ="venue" value={eventData.venue}/> 
        <label> Description:</label>
        <input type="text"onChange={handleChange} name ="description" value={eventData.description}/>
        <label> Category:</label>
        <input type="text"onChange={handleChange} name ="category" value={eventData.category}/>
        <label> Organizer:</label>
        <input type="text"onChange={handleChange} name ="organizer" value={eventData.organizer}/>
        <label> Image :</label>
        <input type="text"onChange={handleChange} name ="image_url" value={eventData.image_url}/>
        <label> Ticket Price:</label>
        <input type="number"onChange={handleChange} name ="ticket_price" value={eventData.ticket_price}/>
        <label> Available Tickets:</label>
        <input type="number"onChange={handleChange} name ="available_tickets" value={eventData.available_tickets}/>
        <label> Tickets Sold:</label>
        <input type="number"onChange={handleChange} name ="tickets_sold" value={eventData.tickets_sold}/>
        <label> Ticket No:</label>
        <input type="text"onChange={handleChange} name ="ticket_number" value={eventData.ticket_number}/>
        <label> Date Time:</label>
        <input type="text"onChange={handleChange} name ="date_time" value={eventData.date_time}/>
        <button type= "submit"> Add Event </button>
         </form>
    </div>
  )
}

export default AddEventForm
