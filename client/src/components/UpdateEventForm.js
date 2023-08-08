import React,{useState} from 'react'
import { useParams, useLocation } from 'react-router-dom';


function UpdateEventForm({setEvents, events}) {
  const [step, setStep] = useState(1);
  const {id} = useParams()
  const location = useLocation();
  const event = location.state && location.state.event
  console.log(event)
  const [eventData, setEventData] = useState({
    title: "",
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
  // console.log(eventData)  


 
  console.log(id)

  function handleSubmitForm(event){
    event.preventDefault()
   
    fetch(`/events/${id}`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("access_token")
      },
      body:JSON.stringify(eventData),
    })
    .then((resp) => resp.json())
    .then((updatedEvent) => {
      const updatedEvents = events.map((event)=>{
        if(event.id === updatedEvent.id) return updatedEvent
        return event
      })
      setEvents(updatedEvents)
    })
  }


  const handleChange = (event) => {
    setEventData({
        ...eventData,
        [event.target.name]: event.target.value,
    });
};

function handleNextStep() {
  if (eventData.description.length === 0 || eventData.title.length === 0 || eventData.venue.length === 0) {
      alert("Please fill in all the required fields.");
  } else {
      const wordCount = eventData.description.trim().split(" ").length;
      if (wordCount < 5 || wordCount > 20) {
          alert("Description should be between 5 to 20 words.");
      } else {
          const wordCountTitle = eventData.title.trim().split(" ").length;
          if (wordCountTitle < 1 || wordCountTitle > 5) {
              alert("Title should be between 1 to 5 words.");
          } else {
              const wordCountVenue = eventData.venue.trim().split(" ").length;
              if (wordCountVenue < 1 || wordCountVenue > 5) {
                  alert("Venue should be between 1 to 5 words.");
              } else {
                  // All conditions are met, so move to the next step
                  setStep((prevStep) => prevStep + 1);
              }
          }
      }
  }
}


  function handlePrevStep(){
    setStep((prevStep) => prevStep - 1);
  }
 

  return (
    <div>
     
        <form onSubmit={handleSubmitForm}>
          <h3>Step 1: Basic Event Details</h3>
          { step === 1 && (           
            <div> 
              <label> Title:</label>
              <input type="text" onChange={handleChange} name ="title" value={eventData.title} required/> 
              <label> Venue</label>
              <input type="text" onChange={handleChange} name ="venue" value={eventData.venue} required/> 
              <label> Description:</label>
              <input type="text"onChange={handleChange} name ="description" value={eventData.description} required/>
              <label> Category:</label>
              <input type="text"onChange={handleChange} name ="category" value={eventData.category} required/>
              <label> Organizer:</label>
              <input type="text"onChange={handleChange} name ="organizer" value={eventData.organizer} required/>
              {eventData.title && eventData.venue && eventData.description && eventData.category && eventData.organizer ? (
              <button type="button" onClick={handleNextStep}>
                Next
              </button>
            ) : null}
            </div>
          )}
  
      { step === 2 && (
        <div>
          <h3>Step 2: Additional Details</h3>
            {/* <form onSubmit={handleSubmitForm}>  */}
              <label> Ticket Price:</label>
              <input type="number"onChange={handleChange} name ="ticket_price" value={eventData.ticket_price} required/>
              {/* <label> Image :</label>
              <input type="text"onChange={handleChange} name ="image_url" value={eventData.image_url} required/> */}
              <label> Available Tickets:</label>
              <input type="number"onChange={handleChange} name ="available_tickets" value={eventData.available_tickets} required/>
              <button type='button' onClick={handlePrevStep}>Previous</button>

              {eventData.ticket_price>=0 && eventData.available_tickets>=1 ? (
              <button type="button" onClick={handleNextStep}>
                Next
              </button>
            ) : null}
            {/* </form> */}
        </div>
      )}

      { step === 3 && (
        <div>
          <h3>Step 3: Location and Date/Time</h3>
            {/* <form onSubmit={handleSubmitForm}>  */}
              <label> Date & Time:</label>
              <input type="text"onChange={handleChange} name ="date_time" value={eventData.date_time} required/>
              <button type='button' onClick={handlePrevStep}>
                Previous
              </button>
              <button type="submit">Update Event</button>
            {/* </form> */}
        </div>
      )}
    </form>  
    </div>
  );
}

export default UpdateEventForm