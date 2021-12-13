import React , {useState} from "react";
import './Notification.css'

const Notification=({NoOfNotifications})=>{
    var isOpen =false;

    const handleClick=()=>{
        isOpen=!isOpen;
        if(!isOpen){
            document.activeElement.blur();
        }
    }

    const [newNotifications,setNotifications] =useState(NoOfNotifications);
    return (
        <>
            <div className="dropdown" onClick={handleClick}>
                <button className="link">
                    <i class="fas fa-bell"></i>
                    <span className="noOfNotification">3</span>
                </button>
                <div className="dropdownmenu">
                    Content
                </div>
            </div>
        </>
    );
}

export default Notification;