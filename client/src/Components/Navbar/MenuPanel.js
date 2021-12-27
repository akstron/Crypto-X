import React from 'react'
import { Link } from "react-router-dom";
import { Menu} from 'antd';
import { HomeOutlined, ProfileOutlined,DollarOutlined,UserAddOutlined, 
        LoginOutlined,BulbOutlined,ShoppingOutlined,LogoutOutlined,
        UserOutlined,BankOutlined,
        TeamOutlined} from '@ant-design/icons';
import axios from 'axios';

const { SubMenu } = Menu;


const MenuPanel =({User,setActiveMenu,screenSize})=>{

    const refreshPage=()=>{
        window.location.reload(false);
    }

    const handleClick=()=>{
        if(screenSize<800)
            setActiveMenu(false);
    }

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

    return(
        <>
            <Menu theme='dark' style={{backgroundColor:'black',width: 256}} 
                mode="inline" onClick={handleClick}>
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
                            <Menu.Item key="5" icon={<ProfileOutlined />}>
                                <Link to='/Portfolio'>Portfolio</Link>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<BankOutlined />}>
                                <Link to='/BankOptions'>Payment Options</Link>
                            </Menu.Item>
                            <Menu.Item key="7" icon={<ShoppingOutlined />} onClick={refreshPage}>
                                <Link to='/BuySell'>BuySell</Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="8" icon={<TeamOutlined />}>
                            <Link to='/AboutUs'> About Us </Link>
                        </Menu.Item>

                        <Menu.Item key="9" icon={<LogoutOutlined />}>
                            <Link to='/' onClick={logOut}>LogOut</Link>
                        </Menu.Item>
                    </>
                ):(
                    <>
                        <Menu.Item key="10" icon={<TeamOutlined />}>
                            <Link to='/AboutUs'> About Us </Link>
                        </Menu.Item>
                        <Menu.Item key="11" icon={<UserAddOutlined />}>
                            <Link to='/Signup'>Sign-Up</Link>
                        </Menu.Item>
                        <Menu.Item key="12" icon={<LoginOutlined />}>
                            <Link to='/Login' on>Login</Link>
                        </Menu.Item>
                    </>
                )}                
            </Menu>
        </>
    );
    
}

export default MenuPanel;