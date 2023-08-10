import React, { useState } from "react";
import { useParams } from "react-router-dom";

function PaymentConfirmation() {
    const [phone, setPhone] = useState("")
    const { product, id } = useParams();
    const [amount, setAmount] = useState(product)
    const [formData, setFormData] = useState(null)
    console.log(formData)
    

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/pay/" + id , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token")
            },
            body: JSON.stringify({phone,amount})
        })
            .then((resp) => resp.json())
            .then((data) => setFormData(data))
            .catch((error) => console.error("not successful", error))


    }
   
    return (
        <div className="payment-container">
          <form className="payment-form" onSubmit={handleSubmit}>
            <h4 className="payment-method">Payment Method: Mpesa</h4>
            <p className="payment-total">
                <b>Total Amount: <span>Kshs.</span></b>
                {product}
            </p>
            <label className="payment-label">Phone Number:</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
              required
              name="phone"
              value={phone}
              pattern="^254\d{9}$"
              title="Please enter a valid phone number in the format '254712345678'."
              placeholder="254712345678"
              className="payment-input"
            />
            <label className="payment-label">Amount:</label>
            <input
              type="text"
              onChange={(e) => setAmount(e.target.value)}
              autoComplete="off"
              required
              name="amount"
              value={product}
              className="payment-input"
            />
            <button type="submit" className="payment-button">
              Confirm Payment
            </button>
          </form>
        </div>
      );
}

export default PaymentConfirmation;
