import React,{useState, useEffect} from 'react'

function Signup() {
    const [user, setUser]= useState({
        username:"",
        email:"",
        password:"",
    })


    function handleOnChange(event){
        setUser({
            ...user,
            [event.target.name]:event.target.value,

        })      
    }

    function handleSubmit(e){
        e.preventDefault()
        const post={
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({user}),
        }
        fetch("/signup", post)
        .then(resp=> resp.json())
        .then(user => console.log(user))
        .catch((error)=>{ console.error("error posting user", error)})

    }



  return (
    <div>
     <form onSubmit={handleSubmit}>
        <h3> Sign Up Form</h3>
              <label> Username: </label>
             <input type="text" onChange={handleOnChange} name="username" value={user.username}/>
              <label> Email: </label>
              <input type="email" onChange={handleOnChange} name="email" value={user.email} />
              <label> Password: </label>
              <input type="password" onChange={handleOnChange} name= "password" value={user.password} />
              <button type="submit">Sign Up</button>
        
        </form> 
    </div>
  )
}

export default Signup
