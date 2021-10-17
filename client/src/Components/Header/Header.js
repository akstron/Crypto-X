import React from "react"
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import './Header.css'
// import { useHistory } from "react-router-dom";

const Header = ({uId,firstName,emailId,setUser}) => {
    // const User=null;
    // const User='Aayush';
    // const history = useHistory();

    // const loginToHome=()=>{
    //     history.push('/')
    // }
    const logOut=async ()=>{
        const userRoute = process.env.REACT_APP_BACKEND + '/logout';
        await axios.post(userRoute, {},{withCredentials: true}).then(res => {
            console.log(res);
            console.log("Log Out Clicked !");
            if(res['data']['status']){
                    setUser(null);
                    // console.log(user);
                    // loginToHome();
                }
        }).catch(error => {
            console.log(error);
        })
    }

    console.log(uId)
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
                    {(emailId!==undefined)?(
                        <>
                            <li className="nav-item">
                                <NavLink to='/Profile'>Hi  {firstName} ! </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to='/' onClick={logOut}>LogOut</NavLink>
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