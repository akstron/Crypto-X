import React from 'react'
import {Col,Typography} from 'antd';

const {Text} = Typography;

const CardEntry = ({title,value}) => {
    return (
        <Col xs={{span:24}} md={{span:12}} style={{width: "fit-content"}}>
            <Col xs={{span:24}} md={{span:12}}>
                <Text style={{color:"grey",margin:".2rem"}}>{title}</Text>
            </Col>
            <Text strong style={{margin:".2rem",fontSize:"medium"}}>{value}</Text>
        </Col>
    )
}

export default CardEntry
