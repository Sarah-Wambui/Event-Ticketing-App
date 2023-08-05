import React,{useState} from 'react'

function UpdateEventForm() {
  const [update, setUpdate] = useState("")
  const [step, setStep] = useState(1);

  function handleSubmit(id){
    fetch(`/events/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(update),
    })
    .then((res)=>res.json())
    .then((updatedEvent)=>setUpdate(updatedEvent))
  }
  
  return (
    <div>
       { step === 1 && (
        <div>
          <h3>Step 1: Basic Event Details</h3>
          <form onSubmit={handleSubmit}> 
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
            <button type='button' onClick={handleNextStep}>
              Next
            </button>
          </form>
        </div>
      )}
      { step === 2 && (
        <div>
          <h3>Step 2: Additional Details</h3>
            <form onSubmit={handleSubmit}> 
              <label> Ticket Price:</label>
              <input type="number"onChange={handleChange} name ="ticket_price" value={eventData.ticket_price}/>
              <label> Image :</label>
              <input type="text"onChange={handleChange} name ="image_url" value={eventData.image_url}/>
              <label> Available Tickets:</label>
              <input type="number"onChange={handleChange} name ="available_tickets" value={eventData.available_tickets}/>
              <button type='button' onClick={handlePrevStep}>
                Previous
              </button>
              <button type='button' onClick={handleNextStep}>
                Next
              </button>
            </form>
        </div>
      )}

      { step === 3 && (
        <div>
          <h3>Step 3: Location and Date/Time</h3>
            <form onSubmit={handleSubmit}> 
              <label> Date & Time:</label>
              <input type="text"onChange={handleChange} name ="date_time" value={eventData.date_time}/>
              <button type='button' onClick={handlePrevStep}>
                Previous
              </button>
              <button type="submit">Add Event</button>
            </form>
        </div>
      )}
    </div>
  )
}

export default UpdateEventForm