import React,{useContext} from 'react'
import {Typography,Row,Col} from 'antd';
import UserDetailsCard from './UserDetailsCard'
import ManageNotification from './ManageNotification/ManageNotification'

import ProfileIcon from '../../Images/profile-logo.png'
import WalletCard from './Wallet/WalletCard'
import OrdersCard from './Orders/OrdersCard'
import { UserContext } from '../../App';

const {Title} =Typography

const ProfilePage = () => {

    const User = useContext(UserContext);
    
    return (
        <div>
            <Title level={3}><img className='login-image' alt='img' src={ProfileIcon} height={'50px'} /> Profile Page </Title>
            <hr/>
            {/* <Row>
                <Col xs={{span:24}} md={{span:24}} xl={{span:18}} style={{margin:".2rem auto"}}> */}
                    <Row >
                        <Col xs={{span:24}} md={{span:24}} xl={{span:12}} style={{margin:".2rem auto"}}>
                            <UserDetailsCard User={User.data}/>
                        </Col>
                        <Col xs={{span:24}} md={{span:24}} xl={{span:12}}>
                            <WalletCard User={User.data}/>
                        </Col>                        
                        
                    </Row>
                    <Row>
                        {/* <Col xs={{span:24}} md={{span:24}} lg={{span:12}} style={{margin:".2rem auto"}}>
                            <Row > */}


                                <Col xs={{span:24}} md={{span:24}} xl={{span:12}}>
                                    <OrdersCard User={User.data}/>
                                </Col>
                                <Col xs={{span:24}} md={{span:24}} xl={{span:12}} style={{margin:".2rem auto"}}>
                                    <ManageNotification/>
                                </Col>                                
                            {/* </Row>
                            
                        </Col> */}
                    </Row>
                {/* </Col>
                
            </Row> */}
            
                   
       </div>
    )
}

export default ProfilePage
