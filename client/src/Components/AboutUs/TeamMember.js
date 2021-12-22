import React from 'react'
import {Card,Row,Col,Typography} from 'antd'

import './TeamMember.css'
const {Title,Text} = Typography;

const teamMember = ({imageIcon,name,role}) => {
    return (
        <div>
            <Card
                style={{margin:".5rem auto",borderRadius:"2rem",width:"fit-content",backgroundColor:"transparent"}}
                hoverable>
                <Row>
                    <Col xs={{span:24}} md={{span:24}}  style={{textAlign:"center",padding:"0.5rem",margin:".2rem auto"}} >
                        <img alt="example" 
                            height="150px"
                            src={imageIcon}
                            style={{ borderRadius:"10rem"}} />
                    </Col>
                    <Col xs={{span:24}} md={{span:24}} style={{textAlign:"center"}}>
                        <Title level={3}>{name}</Title>
                    </Col>
                    <Col xs={{span:24}} md={{span:24}} style={{textAlign:"center"}}>
                        <Text level={4}>{role}</Text>
                    </Col>
                </Row>
                
                
            </Card>
        </div>
    )
}

export default teamMember
