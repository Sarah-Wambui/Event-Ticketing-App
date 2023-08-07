import React, { useState } from 'react';

function UpdateEventForm() {
  const [update, setUpdate] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  function handleSubmit(id) {
    fetch(`/events/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((updatedEvent) => {
        // Do something with the updated event if needed.
        console.log(updatedEvent)
      });
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <h3>Step 1: Basic Event Details</h3>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" onChange={handleChange} name="title" value={update.title || ''} />
            <label>Venue</label>
            <input type="text" onChange={handleChange} name="venue" value={update.venue || ''} />
            <label>Description:</label>
            <input
              type="text"
              onChange={handleChange}
              name="description"
              value={update.description || ''}
            />
            <label>Category:</label>
            <input
              type="text"
              onChange={handleChange}
              name="category"
              value={update.category || ''}
            />
            <label>Organizer:</label>
            <input
              type="text"
              onChange={handleChange}
              name="organizer"
              value={update.organizer || ''}
            />
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div>
          <h3>Step 2: Additional Details</h3>
          <form onSubmit={handleSubmit}>
            <label>Ticket Price:</label>
            <input
              type="number"
              onChange={handleChange}
              name="ticket_price"
              value={update.ticket_price || ''}
            />
            <label>Image :</label>
            <input
              type="text"
              onChange={handleChange}
              name="image_url"
              value={update.image_url || ''}
            />
            <label>Available Tickets:</label>
            <input
              type="number"
              onChange={handleChange}
              name="available_tickets"
              value={update.available_tickets || ''}
            />
            <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="button" onClick={handleNextStep}>
              Next
            </button>
          </form>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Step 3: Location and Date/Time</h3>
          <form onSubmit={handleSubmit}>
            <label>Date & Time:</label>
            <input
              type="text"
              onChange={handleChange}
              name="date_time"
              value={update.date_time || ''}
            />
            <button type="button" onClick={handlePrevStep}>
              Previous
            </button>
            <button type="submit">Add Event</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateEventForm;
