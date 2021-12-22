import React from 'react'
import {Card} from 'antd'
const { Meta } = Card;
const teamMember = ({imageIcon,memberName,role,description,contact,github,emailId}) => {
    return (
        <div>
            <Card
                hoverable
                style={{ width: 240,margin:"1rem",borderRadius:"2rem" }}
                cover={<img alt="example" 
                            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" 
                            style={{ borderRadius:"2rem" }} />}
            >
                <Meta title="Aayush Kumar Shandilya" description="Frontend : UI and Design" />
            </Card>
        </div>
    )
}

export default teamMember
