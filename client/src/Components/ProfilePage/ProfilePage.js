import React,{useContext} from 'react'
import {Typography,Row,Col,Card} from 'antd';
import ProfileIcon from '../../Images/profile-logo.png'

import UserDetailsCard from './UserDetailsCard'
import WalletCard from './WalletCard'
import OrdersCard from './OrdersCard'
import { UserContext } from '../../App';
import profileIcon from '../../Images/profileIcon.png'

const {Text,Title} =Typography

const ProfilePage = () => {

    const User = useContext(UserContext);
    
    return (
        <div>
            <Title level={3}><img className='login-image' alt='img' src={ProfileIcon} height={'50px'} /> Profile Page </Title>
            <hr/>
            <Row>
                <Col xs={{span:24}} md={{span:24}} lg={{span:24}} style={{margin:".2rem auto"}}>
                    <UserDetailsCard User={User.data}/>
                </Col>
                <Col xs={{span:24}} md={{span:24}} lg={{span:12}} style={{margin:".2rem auto"}}>
                    <Row >
                        <Col xs={{span:24}} md={{span:12}}>
                            <OrdersCard User={User.data}/>
                        </Col>
                        <Col xs={{span:24}} md={{span:12}}>
                            <WalletCard User={User.data}/>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
                   
       </div>
    )
}

export default ProfilePage
