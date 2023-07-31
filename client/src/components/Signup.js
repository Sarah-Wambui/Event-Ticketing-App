import React,{useState} from 'react'

function Signup() {
    const [user, setUser]= useState(null)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    console.log(user)


    function handleSubmit(e){
        e.preventDefault()
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
        .then(user => setUser(user))
        .catch((error)=>{ console.error("Error posting user", error)})

    }



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
            onChange={(e) => setEmail(e.target.value)} autoComplete='off' required />
            <label htmlFor="password">Password:</label>
            <input type="password" 
            name="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} required/>
            <button type="submit">Sign Up</button>
        
        </form> 
    </div>
  )
}

export default Signup
