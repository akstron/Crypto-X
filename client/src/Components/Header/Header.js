import React from "react"
import {NavLink} from 'react-router-dom'
import Notification from "./Notification";
import axios from 'axios';
import './Header.css'
import NavItem from "./NavItem";

const Header = ({uId,firstName,emailId,setUser}) => {

    const logOut=async ()=>{
        console.log("Loging Out")
        const userRoute = process.env.REACT_APP_BACKEND + '/logout';
        await axios.post(userRoute, {},{withCredentials: true}).then(res => {
            console.log(res);
            console.log("Log Out Clicked !");
            if(res['data']['status']){
                    setUser(undefined);
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
                <ul className='navbar-nav ms-auto link'>
                    <NavItem path='/' title='Home'/>
                    <NavItem path='/Market' title='Market'/>
                    {(emailId!==undefined)?(
                        <>
                            <NavItem path='/Profile' title={'Profile'}/>
                            <Notification NoOfNotifications={3}/>
                            <li className="nav-item">
                                <NavLink to='/' onClick={logOut}>LogOut</NavLink>
                            </li>

                        </>
                    ):(
                        <>
                        <NavItem path='/signup' title='SignUp'/>
                        <NavItem path='/login' title='Login'/>
                        </>
                    )}

                </ul>
            </div>
        </nav>
    )
}

export default Header; 