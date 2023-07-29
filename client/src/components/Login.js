import React from 'react'

function Login() {
  return (
    <div>
      <h3>Login</h3>
      <form>
              <label> Email: </label>
              <input type="email" />
              <label> Password: </label>
              <input type="password" />
              <button type="submit">Login</button> 

        
      </form>
    </div>
  )
}

export default Login
