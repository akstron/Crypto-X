import React from 'react'
import { useParams } from 'react-router-dom';
import OTPInput from "./Otpinput";
import {Card, Typography} from 'antd'
import OTPIcon from '../../Images/OTPIcon.png'
import signupIcon from '../../Images/signup-logo.png'

const { Text,Title } = Typography;

const OTPPage = () => {
    
    const {emailId} = useParams();

    return (
        <div>
            <Title><img className='signup-image' alt='img' src={signupIcon} height={'45px'} /> Sign-up </Title>
            <hr/>
            <Card 
                title={<Title level={3}>OTP</Title>}
                extra={<img className='crypto-image' alt='img' src={OTPIcon} height='35px'/>}
                hoverable
                style={{margin:".5rem auto",width:"fit-content"}}>
                <Text> Please enter OTP sent to your Email ({emailId}) to verify.</Text>
                <OTPInput/>
            </Card>
        </div>
    )
}

export default OTPPage
