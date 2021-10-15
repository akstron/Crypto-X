import React from "react"
import {NavLink} from 'react-router-dom'
import './Header.css'

const Header = () => {
    const User=null;
    // const User='Aayush';

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
                <ul className='navbar-nav ms-auto'>
                    <li className="nav-item active">
                        <NavLink to='/'>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Market'>Market</NavLink>
                    </li>
                    {User?(
                        <>
                            <li className="nav-item">
                                <NavLink to='/'>Hi  {User} ! </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/'>LogOut</NavLink>
                            </li>
                        </>
                    ):(
                        <>
                        <li className="nav-item">
                            <NavLink to='/signup'>Sign Up</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/login'>Login</NavLink>
                        </li>
                        </>
                    )}
                    
                </ul>
            </div>
        </nav>
    )
}

export default Header; 