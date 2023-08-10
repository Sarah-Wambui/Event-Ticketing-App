import React, { useState } from "react";
import { useParams } from "react-router-dom";

function PaymentConfirmation({ events, setEvents }) {
    console.log(useParams());
    const [phone, setPhone] = useState("");
    const { id, product, remaining_tickets } = useParams();
    console.log(remaining_tickets);
    const [amount, setAmount] = useState(product);
    const [formData, setFormData] = useState(null);
    console.log(formData);

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`/pay/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({ phone, amount }),
        })
            .then((resp) => resp.json())
            .then((data) => setFormData(data))
            .catch((error) => console.error("not successful", error));
    }

    let remain_tickets = Number(remaining_tickets);
    console.log(remain_tickets);

    function handleDeductTickets() {
        fetch(`/events/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
                available_tickets: remain_tickets,
            }),
        })
            .then((resp) => resp.json())
            .then((updatedEvent) => {
                const updatedEvents = events.map((event) => {
                    if (event.id === updatedEvent.id) return updatedEvent;
                    return event;
                });
                console.log(updatedEvents);
                setEvents(updatedEvents);
                console.log(updatedEvents);
            });
    }

    return (
        <div className="payment-container">
            <form className="payment-form" onSubmit={handleSubmit}>
                <h4 className="payment-method">Payment Method: Mpesa</h4>
                <p className="payment-total"><b>Total Amount: <span>Kshs.</span></b>{product}</p>
                <div className="payment-input-container">
                    <label className="payment-input-label">Phone Number</label>
                    <input
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete='off'
                        required
                        name="phone"
                        value={phone}
                        pattern="^254\d{9}$"
                        title="Please enter a valid phone number in the format '254712345678'."
                        className="payment-input"
                        placeholder="254712345678"
                    />
                </div>
                <div className="payment-input-container">
                    <label className="payment-input-label">Amount</label>
                    <input
                        type="text"
                        onChange={(e) => setAmount(e.target.value)}
                        autoComplete='off'
                        required
                        name="amount"
                        value={product}
                        className="payment-input"
                    />
                </div>
                <button
                    type="submit"
                    className="payment-button"
                    onClick={handleDeductTickets}
                >
                    Confirm Payment
                </button>
            </form>
        </div>
    );
}

export default PaymentConfirmation;