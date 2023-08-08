import React,{useState} from 'react'
import { useNavigate } from "react-router-dom"

function Signup() {
    const [user, setUser]= useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(user)

    const navigate =useNavigate()

    const validateEmail = (email) => {
      // Regular expression for email validation
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      // Test the email against the pattern
      return emailPattern.test(email);
    };



    function handleSubmit(e){
        e.preventDefault()
        if (password.length !== 8) {
          alert('Password must be 8 characters long.');
          return;
        }
        if (username.length < 3 || username.length > 20) {
          alert('username must be between 3 and 20 characters.');
          return;
        }
        if (!validateEmail(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        const post={
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username, 
              password, 
              email,
          }),
        }
        fetch("/signup", post)
        .then(resp=> resp.json())
        .then((user) => {
          setUser(user);
          navigate("/login")})
        .catch((error) => {console.error("Error posting user", error)});

   
    }

    // if (password.length !== 6) {
    //   alert('Password must be exactly 6 characters long.');
    //   return;
    // }



  return (
    <div>
     <form onSubmit={handleSubmit}>
        <h3> Sign Up Form</h3>
        <label htmlFor="username">Username:</label>
            <input type="text" 
            name="username" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} autoComplete='off' required />
            <label htmlFor="email">Email:</label>
            <input type="text" 
            name="email" 
            id="email" 
            value={email} 
            placeholder="john.doe@example.com"
            onChange={(e) => setEmail(e.target.value)} autoComplete='off' required />
            <label htmlFor="password">Password:</label>
            <input type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} required/>
        <button type="submit" >Sign Up</button>
        
        </form> 
    </div>
  )
}

export default Signup
