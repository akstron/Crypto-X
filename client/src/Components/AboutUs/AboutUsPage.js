import React from 'react'
import {Row,Col, Typography,Card} from 'antd'
import teamIcon from '../../Images/teamIcon.png'
import memberIcon from '../../Images/profileIcon.png'
import TeamMember from './TeamMember'

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
                <Title level={2}><img alt='img' src={teamIcon} height={'45px'} /> Meet the Team</Title>
                <hr/>
                <Card style={{ width:"fit-content",margin:".2rem auto",backgroundColor:"transparent"}}>
                    <Row>
                        <Col xs={{span:24}} md={{span:12}} lg={{span:8}}><TeamMember {...teamMember}/></Col>
                        <Col xs={{span:24}} md={{span:12}} lg={{span:8}}><TeamMember {...teamMember}/></Col>
                        <Col xs={{span:24}} md={{span:12}} lg={{span:8}}><TeamMember {...teamMember}/></Col>
                    </Row>
                </Card>
		    </div>
        </div>
    )
}

export default AboutUsPage
