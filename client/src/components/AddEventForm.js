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

  function handleNextStep(){
    setStep((prevStep) => prevStep + 1);
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
    // event.preventDefault()
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
    <div>
      { step === 1 && (
        <div>
          <h3>Step 1: Basic Event Details</h3>
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
            <button type='button' onClick={handleNextStep}>Next</button>
          </form>
        </div>
      )}
      { step === 2 && (
        <div>
          <h3>Step 2: Additional Details</h3>
            <form onSubmit={handleSubmitForm}> 
              <label> Ticket Price:</label>
              <input type="number"onChange={handleChange} name ="ticket_price" value={eventData.ticket_price}/>
              {/* <label> Image :</label>
              <input type="text"onChange={handleChange} name ="image_url" value={eventData.image_url}/> */}
              <label> Available Tickets:</label>
              <input type="number"onChange={handleChange} name ="available_tickets" value={eventData.available_tickets}/>
              <button type='button' onClick={handlePrevStep}>Previous</button>

              <button type='button' onClick={handleNextStep}>Next</button>
            </form>
        </div>
      )}

      { step === 3 && (
        <div>
          <h3>Step 3: Location and Date/Time</h3>
            <form onSubmit={handleSubmitForm}> 
              <label> Date & Time:</label>
              <input type="text"onChange={handleChange} name ="date_time" value={eventData.date_time}/>
              <button type='button' onClick={handlePrevStep}>
                Previous
              </button>
              <button type="submit">Add Event</button>
            </form>
            <div>
              <label>Image:</label>
              <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
              <button onClick={handleUploadImage}>Upload Image</button>
            </div>
        </div>
      )}

    </div>
  );
}

export default AddEventForm
