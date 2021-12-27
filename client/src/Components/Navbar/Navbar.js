import React,{ useContext,useState,useEffect } from 'react'
import { Button,Typography,Avatar } from 'antd';
import { Link } from "react-router-dom";
import { MenuOutlined } from '@ant-design/icons';
import MenuPanel from "./MenuPanel";
import icon from '../../Images/main-logo.png';

import { UserContext } from '../../App';


const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    
    const User = useContext(UserContext);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className='nav-container' >
            <div className="logo-container">
                <Avatar src={icon} size={64}/>
                <Typography.Title level={3} className="logo">
                    <Link to='/'>Baniya-Trade</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => {setActiveMenu(!activeMenu)}}> 
                    <MenuOutlined />
                </Button>
            </div>
            <div>
                {(activeMenu) && (
                    <MenuPanel User={User} setActiveMenu={setActiveMenu} screenSize={screenSize}/>
                )}
            </div>

        </div>
    )
}

export default Navbar
