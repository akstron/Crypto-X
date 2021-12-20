import React from 'react'
import { Typography,Card,Button,Row,Col} from 'antd';
import CardEntry from '../ProfilePage/CardEntry'
const { Title } = Typography;

const BankCard = () => {
    return (
        <div>
            <Card 
                title={<strong><img alt="SBI" height="40px" src={'https://icon2.cleanpng.com/20180811/wtt/kisspng-state-bank-of-india-patiala-mobile-banking-state-bank-freedom-latest-version-for-free-downl-5b6f4d028b94a5.8328729915340208665717.jpg'}/>  SBI</strong>}
                style={{borderRadius:"2rem",margin:".5rem auto",width:"fit-content"}}
                hoverable >
                <Row>
                    <CardEntry title={"Name :"} value={'Aayush Shandilya'}/>
                    <CardEntry title={"A/C No:"} value={'2596XXXX55'}/>
                    <CardEntry title={"Expiry:"} value={'02/25'}/>
                    <CardEntry title={"CCV"} value={'XXX'}/>
                </Row>
            </Card>
        </div>
    )
}

export default BankCard
