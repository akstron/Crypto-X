import React from 'react'
import { Typography,Card,Alert,Row,Col} from 'antd';
import CardEntry from '../ProfilePage/CardEntry'
import upiIcon from '../../Images/upi.png' 
import bankIcon from '../../Images/bankIcon.png' 

const { Title } = Typography;

const BankCard = ({Name,AccountNo,ifsc,upiId}) => {
    return (
        <div>
            {(!Name && !upiId)?(
                <>
                    <Alert message="No Options Saved Yet !" type="warning" />
                </>
            ):(
                <>
                    {(Name!==undefined)?(
                        <>
                            <Card 
                                title={<strong><img alt="SBI" height="40px" src={bankIcon}/>  Bank Account </strong>}
                                style={{borderRadius:"2rem",margin:".5rem auto"}}
                                hoverable >
                                <Row>
                                    <CardEntry title={"Name :"} value={Name}/>
                                    <CardEntry title={"A/C No:"} value={AccountNo}/>
                                    <CardEntry title={"IFSC :"} value={ifsc}/>
                                </Row>
                            </Card>                  
                        </>
                    ):(<></>)}

                    {(upiId!==undefined)?(
                        <>
                             <Card 
                                title={<strong><img alt="SBI" height="40px" src={upiIcon}/>  UPI ID</strong>}
                                style={{borderRadius:"2rem",margin:".5rem auto"}}
                                hoverable >
                                <Row>
                                    <Col span={24}>UPI ID</Col>
                                    <Col span={24}><Title level={5}>{upiId}</Title></Col>
                                </Row>
                            </Card>
                        </>
                    ):(<></>)}
                </>
            )}
        </div>
    )
}

export default BankCard
