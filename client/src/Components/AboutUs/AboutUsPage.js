import React from 'react'
import {Row,Col, Typography,Card,Divider} from 'antd'
import teamIcon from '../../Images/teamIcon.png'
import memberIcon from '../../Images/profileIcon.png'
import TeamMember from './TeamMember'

import AayushIcon from '../../Images/TeamMembers/AayushDP.jpeg' 
import AlokIcon from '../../Images/TeamMembers/AlokDP.jpeg' 
import SaurabhIcon from '../../Images/TeamMembers/SaurabhDP.jpeg' 
import profileIcon from '../../Images/profile-logo.png' 
import meetTeamIcon from '../../Images/AboutUsPage/meetTeamIcon.png'
import letterIcon from '../../Images/AboutUsPage/letterIcon.png'


const {Title} =Typography

const teamMember={
	imageIcon:memberIcon,
	memberName:'Aayush Kumar',
	role:"Frontend",
	description:"Managing Frontend and UI",
	contact:"6264465475",
	github:"www.aayush.com",
	emailId:"aayushshandilya80@gmail.com"
}

const AboutUsPage = () => {
    return (
        <div>
            <div>

                <Title level={2}><img alt='img' src={teamIcon} height={'45px'} /> About Us</Title>
                <Divider orientation="right">
                    <Title level={4}><img alt='img' src={letterIcon} height={'45px'} /> Words from Team</Title>
                </Divider>
                <div className="aboutUs-text" style={{fontFamily: "'Gochi Hand', cursive",fontSize:"x-large",textAlign:"left",margin:"2rem"}}>
                    Welcome to Crypto-X, 
                    <br/>
                    <br/>
                    Your number one source for all crypto coins queries. 
                    Created during College Feast Event Aviskar by our Team , Crypto-X allow user to trade in different crypto coins among themselves. So, here's are hardwork as form of this website.
                    Durind Development everyone learnt a great deal of react , NodeJs ,MongoDb and about different trading systems and their designs from various resources include "Webster Team".
                    We hope you enjoy our website as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
                    <br/>
                    <div className="team-div"
                        style={{textAlign:"right",margin:".5rem"}}>
                        Baniya-Trade Team
                    </div>
                </div>
                <Divider orientation="left">
                    <Title level={4}><img alt='img' src={meetTeamIcon} height={'45px'} />  Meet the Team</Title>
                </Divider>

                {/* <Card style={{ width:"fit-content",margin:".2rem auto",backgroundColor:"transparent"}}> */}
                    <Row>
                        <Col xs={{span:24}} md={{span:12}} lg={{span:8}}><TeamMember imageIcon={AayushIcon} name={'Aayush Shandilya'} role={'UI (React and Antd)'}/></Col>
                        <Col xs={{span:24}} md={{span:12}} lg={{span:8}}><TeamMember imageIcon={AlokIcon} name={'Alok Singh'} role={'Database and Backend'}/></Col>
                        <Col xs={{span:24}} md={{span:12}} lg={{span:8}}><TeamMember imageIcon={SaurabhIcon} name={'Saurabh Kaushal'} role={'Payments,API and Sockets'}/></Col>
                    
                    </Row>
                {/* </Card> */}
		    </div>
        </div>
    )
}

export default AboutUsPage
