import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({isLoggedIn}) => {

    
    return (
        <nav>
            {!isLoggedIn ? ( <> <Link to='/login'> Login</Link>
            <Link to='/signup'> SignUp</Link></> ) :  (            
<>            <Link to='/'>Event</Link>
            <Link to='/newevent'> Create Event</Link>
            <Link to='/about'> Our Story</Link></>)   }



        </nav>
    )
}

export default NavBar
