import React from "react"
import {Link} from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <div className='nav-bar'>
            <h3> Baniya-Trade </h3>
            <ul className='nav'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/signup'>Sign Up</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </div>
    )
}

export default Header;