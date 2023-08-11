import React from 'react'
import { Link , useNavigate} from 'react-router-dom'

const NavBar = ({email}) => {

    const navigate = useNavigate()

    function handleLogout(){
        localStorage.removeItem("access_token")
        navigate("/login")

    }

    
    return (
        <nav className='navbar' >
            <div className='container'>
                <div className='logo' >
                    EVENTGO
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
                        <li>
                            <button onClick={handleLogout} className="logout" >Logout</button>
                        </li>
                        <li>({email})</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
