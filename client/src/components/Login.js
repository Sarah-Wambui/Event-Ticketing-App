import React, {useState} from 'react'


function Login() {
  const [user, setUser]= useState(null)
  const [email, setEmail]=useState("")
  const [password, setPassword]=useState("")

  console.log(user)

  
  function handleSubmit(e){
    e.preventDefault()
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
        .then((user) => setUser(user))
      }else {
        alert("Incorrect username or password!")
      }
    })
    .catch((error) => {
      console.error('Error logging in:', error);
    })
  }

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
              <label> Email: </label>
              <input type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete='off' required />
              <label> Password: </label>
              <input type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} required/>
              <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login