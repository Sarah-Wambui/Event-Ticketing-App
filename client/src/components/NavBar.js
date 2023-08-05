import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

    
    return (
        <nav>
            <Link to='/'><button>Event </button></Link>
            <Link to='/login'> Login</Link>
            <Link to='/signup'> SignUp</Link>
            <Link to='/newevent'> Create Event</Link>
            <Link to='/about'> Our Story</Link>


        </nav>
    )
}

export default NavBar
