import React, { useState } from "react";
import { useParams } from "react-router-dom";

function PaymentConfirmation() {
    console.log(useParams());
    const [phone, setPhone] = useState("")
    const [amount, setAmount] = useState(null)

    const [formData, setFormData] = useState(null)
    console.log(formData)
    const { product } = useParams();
    // setAmount(product)

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/pay?phone=${phone}&amount=${amount}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                phone,
                amount,
            })
        })
            .then((resp) => resp.json())
            .then((data) => setFormData(data))
            .catch((error) => console.error("not successful", error))


    }
   
    return (
        <div>
            hey hey
            <p>
                <b>
                    {" "}
                    Total Amount: <span>Kshs.</span>
                </b>{" "}
                {product}
            </p>
            <form onSubmit={handleSubmit}>
                <h4>Payment Method:Mpesa</h4>
                <label>Phone Number</label>
                <br />
           
                <input type="text" onChange={(e) => setPhone(e.target.value)} autoComplete='off' required name="phone" value={phone} /> <br />
                <br />
                <label>Amount</label>
                <br />
                <input type="text" onChange={(e) => setAmount(e.target.value)} autoComplete='off' required name="amount" value={product} />

                <br />
                <button type="submit">Confirm Payment</button>
            </form>
        </div>
    );
}

export default PaymentConfirmation;
