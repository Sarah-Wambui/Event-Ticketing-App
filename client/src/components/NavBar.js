import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {

    
    return (
        <nav className='navbar' >
            <div className='container'>
                <div className='logo' >
                    LOGO
                </div>
                <div className='menu'>
                    <ul>
                        <li>
                            <Link to='/'>Event </Link>
                        </li>
                        <li>
                            <Link to='/login'> Login</Link>
                        </li>
                        <li>
                            <Link to='/signup'> SignUp</Link>
                        </li>
                        <li>
                            <Link to='/newevent'> Create Event</Link>
                        </li>
                        <li>
                            <Link to='/about'> Our Story</Link>                    
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
