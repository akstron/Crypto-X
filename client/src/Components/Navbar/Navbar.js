import React,{ useContext,useState,useEffect } from 'react'
import axios from 'axios';
import { Button,Menu,Typography,Avatar } from 'antd';
import { Link } from "react-router-dom";
import { HomeOutlined, ProfileOutlined,DollarOutlined,UserAddOutlined, 
        LoginOutlined,BulbOutlined,ShoppingOutlined,LogoutOutlined,
        NotificationOutlined,UserOutlined,MenuOutlined,BankOutlined,
        TeamOutlined} from '@ant-design/icons';
import icon from '../../Images/main-logo.png'

// !important Change Back to App
import { UserContext } from '../../App';

const { SubMenu } = Menu;

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
                <Avatar src={icon} size={64}/>
                <Typography.Title level={3} className="logo">
                    <Link to='/'>Baniya-Trade</Link>
                </Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && (
                <Menu theme='dark' style={{backgroundColor:'black',width: 256}} 
                    mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined/>}>
                        <Link to='/'>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DollarOutlined />}>
                        <Link to='/Market'>Market</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<BulbOutlined/>}>
                        <Link to='/News'>News</Link>
                    </Menu.Item>
                    {(User?.data)?(
                        <>
                            <SubMenu key="account" icon={<UserOutlined />} title="My Account">
                                <Menu.Item key="4" icon={<UserOutlined />}>
                                    <Link to='/Profile'>Profile</Link>
                                </Menu.Item>
                                <Menu.Item key="8" icon={<ProfileOutlined />}>
                                    <Link to='/Portfolio'>Portfolio</Link>
                                </Menu.Item>
                                <Menu.Item key="5" icon={<BankOutlined />}>
                                    <Link to='/BankOptions'>Payment Options</Link>
                                </Menu.Item>
                                <Menu.Item key="6" icon={<ShoppingOutlined />}>
                                    <Link to='/BuySell'>BuySell</Link>
                                </Menu.Item>
                            </SubMenu>

                            <Menu.Item key="7" icon={<NotificationOutlined />}>
                                <Link to='/ManageNotification'> Notify Me </Link>
                            </Menu.Item>

                            <Menu.Item key="8" icon={<TeamOutlined />}>
                                <Link to='/AboutUs'> About Us </Link>
                            </Menu.Item>

                            <Menu.Item key="9" icon={<LogoutOutlined />}>
                                <Link to='/' onClick={logOut}>LogOut</Link>
                            </Menu.Item>
                        </>
                    ):(
                        <>
                            <Menu.Item key="7" icon={<TeamOutlined />}>
                                <Link to='/AboutUs'> About Us </Link>
                            </Menu.Item>
                            <Menu.Item key="8" icon={<UserAddOutlined />}>
                                <Link to='/Signup'>Sign-Up</Link>
                            </Menu.Item>
                            <Menu.Item key="9" icon={<LoginOutlined />}>
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
