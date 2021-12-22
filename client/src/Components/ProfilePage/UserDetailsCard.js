import React from 'react'
import {Card,Avatar,Statistic,Row,Col,Typography} from 'antd';
import { UserOutlined,CheckCircleTwoTone,QuestionCircleTwoTone} from '@ant-design/icons';
import CardEntry from './CardEntry'
import profileIcon from '../../Images/profileIcon.png'
 
const {Text} = Typography;

const UserDetailsCard = ({User}) => {
    return (
        <div>
            {console.log(User)}
            <Card 
                style={{width: "fit-content",
                        margin:"2rem auto",
                        borderRadius:"2rem"}}
                hoverable>
                    <Row>
                        <Col xs={{span:24}} md={{span:4}}  style={{textAlign:"center"}} >
                            <img  alt='img' src={profileIcon} height={'45px'} style={{display: "inline",margin:".2rem auto"}}/>
                        </Col>
                        <Col xs={{span:24}} md={{span:20}} style={{textAlign:"center"}}>
                            <Text strong style={{margin:".2rem",fontSize:"x-large"}}> Personal Information </Text>
                        </Col>
                    </Row>
                    <hr style={{margin:"0.5rem"}}/>
                <Row>
                    <Col xs={{span:24}} md={{span:12}} style={{textAlign:"center"}}>
                        <Avatar size={64} icon={<UserOutlined />}/>
                    </Col>
                    <CardEntry title={'Name'} value={User.firstName+" "+User.lastName}/>
                    <CardEntry title={'Email Id'} value={User.email}/>
                    <CardEntry title={(User.isVerified)?('Verified User'):('Unverified User')} value={(User.isVerified)?(<CheckCircleTwoTone twoToneColor="#52c41a" />):(<QuestionCircleTwoTone twoToneColor="red"/>)}/>
                </Row>
            </Card>
        </div>
    )
}

export default UserDetailsCard
