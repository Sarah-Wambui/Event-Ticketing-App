import React, {useState} from 'react'
import {useNavigate, Link} from "react-router-dom"


function Login({onLogin}) {
  // const [user, setUser]= useState(null)
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")
  // console.log(setUser)


  // console.log(user)

  const navigate= useNavigate()

  const navigateToNewEvent = () => {
    navigate('/');
  };
   
  
  function handleSubmit(e){
    e.preventDefault()
    if (password.length !== 8) {
      alert('Password must be 8 characters long.');
      return;
    }
  
    fetch("/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify({email, password})
    })
    .then((r) =>{
      if (r.ok){
        r.json()
        .then((data) => {
          onLogin(data)
          navigateToNewEvent()
      })

      }else {
        alert("Incorrect email or password!")
      }
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    })
    
  }

  // if (password.length !== 6) {
  //   alert('Password must be exactly 6 characters long.');
  //   return;
  // }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="login-header">Login</h3>
        <div className="login-input-container">
          <label>Email:</label>
          <input
            type="text"
            className="login-input"
            name="email"
            id="email"
            value={email}
            placeholder="john.doe@example.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="login-input-container">
          <label>Password:</label>
          <input
            type="password"
            className="login-input"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}  
export default Login;