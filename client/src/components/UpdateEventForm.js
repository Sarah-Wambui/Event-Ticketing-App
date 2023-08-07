import React,{useState} from 'react'
import { useParams } from 'react-router-dom';


function UpdateEventForm({setEvents, events}) {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
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
  // console.log(eventData)  


  const {id} = useParams()
  // console.log(events)

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
    .then((updatedEvent) => console.log(updatedEvent))
  }


  const handleChange = (event) => {
    setEventData({
        ...eventData,
        [event.target.name]: event.target.value,
    });
};

  function handleNextStep(){
    setStep((prevStep) => prevStep + 1);
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
              <input type="text" onChange={handleChange} name ="title" value={eventData.title}/> 
              <label> Venue</label>
              <input type="text" onChange={handleChange} name ="venue" value={eventData.venue}/> 
              <label> Description:</label>
              <input type="text"onChange={handleChange} name ="description" value={eventData.description}/>
              <label> Category:</label>
              <input type="text"onChange={handleChange} name ="category" value={eventData.category}/>
              <label> Organizer:</label>
              <input type="text"onChange={handleChange} name ="organizer" value={eventData.organizer}/>
              <button type='button' onClick={handleNextStep}>Next</button>
            </div>
          )}
  
      { step === 2 && (
        <div>
          <h3>Step 2: Additional Details</h3>
            {/* <form onSubmit={handleSubmitForm}>  */}
              <label> Ticket Price:</label>
              <input type="number"onChange={handleChange} name ="ticket_price" value={eventData.ticket_price}/>
              <label> Image :</label>
              <input type="text"onChange={handleChange} name ="image_url" value={eventData.image_url}/>
              <label> Available Tickets:</label>
              <input type="number"onChange={handleChange} name ="available_tickets" value={eventData.available_tickets}/>
              <button type='button' onClick={handlePrevStep}>Previous</button>

              <button type='button' onClick={handleNextStep}>Next</button>
            {/* </form> */}
        </div>
      )}

      { step === 3 && (
        <div>
          <h3>Step 3: Location and Date/Time</h3>
            {/* <form onSubmit={handleSubmitForm}>  */}
              <label> Date & Time:</label>
              <input type="text"onChange={handleChange} name ="date_time" value={eventData.date_time}/>
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