import React,{useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"


function AddEventForm({handleAddEvent, isLoggedIn}) {
  const [step, setStep] = useState(1);
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  console.log(url)
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
  console.log(eventData)


  function handleSubmitForm(event) {
    event.preventDefault()
    fetch("/events",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization": "Bearer " + localStorage.getItem("access_token")
    },
    body:JSON.stringify(eventData),
    })
    .then((resp)=>resp.json())
    .then((newEvent)=>handleAddEvent(newEvent))
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


  function handleNextStep() {
    if (eventData.description.length === 0 || eventData.title.length === 0 || eventData.venue.length === 0 || eventData.category.length === 0 || eventData.organizer.length === 0) {
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
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);


  function handleUploadImage(){
    const data = new FormData()
    data.append("file", image)
    data.append("cloud_name", "eventgo")
    fetch("/upload", {
      method: "POST",
      body: data
    })
    .then((resp) => resp.json())
    .then(data=> {
      setUrl(data.url)
      setEventData((prevEventData) => ({
        ...prevEventData,
        image_url: data.url
      }));
    })
    .catch(error => console.log("could not post image", error))
   }
  


   return (
    <div className='form-container'>
        <form onSubmit={handleSubmitForm}>
          
          { step === 1 && ( 
            <> 
            <h3>Step 1: Basic Event Details</h3> 
            <div>
          <label className='form-label'>Image:</label>
          <div className='file-input-container'>
            <input
              type='file'
              className='form-input'
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <button  type="button" onClick={handleUploadImage}>Upload Image</button>
          </div>
        </div>       
            <div> 
              <label className="form-label"> Title:</label>
              <input type="text" className="form-input" onChange={handleChange} name ="title" value={eventData.title} required/> 
              <label className="form-label"> Venue</label>
              <input type="text" className="form-input" onChange={handleChange} name ="venue" value={eventData.venue} required/> 
              <label className="form-label"> Description:</label>
              <input type="text" className="form-input" onChange={handleChange} name ="description" value={eventData.description} required/>
              <label className="form-label"> Category:</label>
              <input type="text" className="form-input" onChange={handleChange} name ="category" value={eventData.category} required/>
              <label className="form-label"> Organizer:</label>
              <input type="text" className="form-input" onChange={handleChange} name ="organizer" value={eventData.organizer} required/>
              {eventData.title && eventData.venue && eventData.description && eventData.category && eventData.organizer ? (
              <button type='button' className='form-button float-right' onClick={handleNextStep}>
                <span className='top-key'></span>
                <span className='text'>Next</span>
                <span className='bottom-key-1'></span>
                <span className='bottom-key-2'></span>
              </button>
            ) : null}
            </div>
            </> 
          )}
  
      { step === 2 && (
        <div>
          <h3>Step 2: Additional Details</h3>
            {/* <form onSubmit={handleSubmitForm}>  */}
              <label className="form-label"> Ticket Price:</label>
              <input type="number" className="form-input" onChange={handleChange} name ="ticket_price" value={eventData.ticket_price} required/>
              {/* <label> Image :</label>
              <input type="text"onChange={handleChange} name ="image_url" value={eventData.image_url} required/> */}
              <label className="form-label" > Available Tickets:</label>
              <input type="number" className="form-input" onChange={handleChange} name ="available_tickets" value={eventData.available_tickets} required/>
              <button type='button' className='form-button float-left'onClick={handlePrevStep} >
                  <span className='top-key'></span>
                  <span className='text'>Previous</span>
                  <span className='bottom-key-1'></span>
                  <span className='bottom-key-2'></span>
              </button>
              {eventData.ticket_price>=0 && eventData.available_tickets>=1 ? (
              <button type='button' className='form-button float-right' onClick={handleNextStep}>     
                <span className='top-key'></span>
                <span className='text'>Next</span>
                <span className='bottom-key-1'></span>
                <span className='bottom-key-2'></span>
              </button>
            ) : null}
        </div>
      )}

      { step === 3 && (
          <>
        <div>
          <h3>Step 3: Location and Date/Time</h3>
              <label className="form-label"> Date & Time:</label>
              <input type="text" className="form-input" onChange={handleChange} name ="date_time" value={eventData.date_time} required/>
              <button type='button' className='form-button' onClick={handlePrevStep}>
                <span className='top-key'></span>
                <span className='text'>Previous</span>
                <span className='bottom-key-1'></span>
                <span className='bottom-key-2'></span>
              </button>
              <button type='submit' className='form-button float-right' onClick={() => alert("Event Added Successfully!")}>
                <span className='top-key'></span>
                <span className='text'>Add Event</span>
                <span className='bottom-key-1'></span>
                <span className='bottom-key-2'></span>
              </button>
        </div> 

      </>             
      )}
    </form>  
    </div>
  );
}
export default AddEventForm
