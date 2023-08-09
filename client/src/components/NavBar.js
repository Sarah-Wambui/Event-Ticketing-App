import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

    
    return (
        <nav>        
            <Link to='/'>Event</Link>
            <Link to='/newevent'> Create Event</Link>
            <Link to='/about'> Our Story</Link>
            <Link to='/login'> Login</Link>
            <Link to='/signup'> SignUp</Link> 
        </nav>
    )
}

export default NavBar
