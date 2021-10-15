import React from "react"
import {NavLink} from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-mainbg'>
            <NavLink className="navbar-brand" to='/'> 
                Baniya-Trade 
            </NavLink>
            <button 
                className="navbar-toggler"
                type="button" data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <i className="fas fa-align-justify"></i>
            </button>
            <div className="collapse navbar-collapse" 
                id="navbarSupportedContent">
                <ul className='navbar-nav ml-auto'>
                    <div className="hori-selector">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                    <li className="nav-item active">
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Market'>Market</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/signup'>Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/login'>Login</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header; 