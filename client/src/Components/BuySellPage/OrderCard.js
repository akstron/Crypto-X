import { Result, Button,Card } from 'antd';

import React from 'react'

const OrderCard = () => {
    return (
        <div>
            <Card
                style={{margin:"1rem auto",width:"fit-content",padding:"1rem"}}>
                <Result
                    status="success"
                    title="Successfully Purchased Cloud Server ECS!"
                    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                    extra={[
                    <Button type="primary" key="console">
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                    ]}
                />
            </Card>
            
        </div>
    )
}

export default OrderCard;