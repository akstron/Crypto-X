import React , {useState} from "react";
import { NavDropdown } from "react-bootstrap";
import './Notification.css'
import DropDown from './DropDown'
import { ReactComponent as BellIcon } from "../../assets/notificationIcon.svg";

const Notification=({NoOfNotifications})=>{
    const [newNotifications,setNotifications] =useState(NoOfNotifications);
    return (
        <>
            <NavDropdown title={"🔔"+((newNotifications>0)?newNotifications:"")} id="basic-nav-dropdown" className='nav-item'>
                
                <NavDropdown.Item href="#action/3.2"><DropDown/></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2"><DropDown/></NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2"><DropDown/></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Clear All</NavDropdown.Item>
            </NavDropdown>
        </>
    );
}

export default Notification;