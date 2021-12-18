import React,{ useContext,useState,useEffect } from 'react'
import axios from 'axios';
import { Button,Menu,Typography,Avatar } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined, DollarOutlined,UserAddOutlined, LoginOutlined,BulbOutlined,ShoppingOutlined,LogoutOutlined,UserOutlined,MenuOutlined} from '@ant-design/icons';
import icon from '../../Images/main-logo.png'
import { UserContext } from '../../App';


const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);
    
    const User = useContext(UserContext);
 
    const logOut=async ()=>{
        console.log("Loging Out")
        const userRoute = process.env.REACT_APP_BACKEND + '/logout';
        await axios.post(userRoute, {},{withCredentials: true}).then(res => {
            console.log(res);
            console.log("Log Out Clicked !");
            window.location.reload(false);
        }).catch(error => {
            console.log(error);
        })
    }

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
        <div className='nav-container'>
            <div className="logo-container">
                <Avatar src={icon} size={32}/>
                <Typography.Title level={3} className="logo">
                    <Link to='/'>Baniya-Trade</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && (
                <Menu theme='dark' style={{backgroundColor:'black'}}>
                    <Menu.Item icon={<HomeOutlined/>}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DollarOutlined />}>
                        <Link to='/Market'>Market</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined/>}>
                        <Link to='/News'>News</Link>
                    </Menu.Item>
                    {(User?.data)?(
                        <>
                            <Menu.Item icon={<UserOutlined />}>
                                <Link to='/Profile'>Profile</Link>
                            </Menu.Item>
                            <Menu.Item icon={<ShoppingOutlined />}>
                                <Link to='/BuySell'>BuySell</Link>
                            </Menu.Item>
                            <Menu.Item icon={<LogoutOutlined />}>
                                <Link to='/' onClick={logOut}>LogOut</Link>
                            </Menu.Item>
                        </>
                    ):(
                        <>
                            <Menu.Item icon={<UserAddOutlined />}>
                                <Link to='/Signup'>Sign-Up</Link>
                            </Menu.Item>
                            <Menu.Item icon={<LoginOutlined />}>
                                <Link to='/Login' on>Login</Link>
                            </Menu.Item>
                        </>
                    )}                
                </Menu>
            )}
        </div>
    )
}

export default Navbar
