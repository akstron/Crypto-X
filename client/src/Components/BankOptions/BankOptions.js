import React from 'react'
import { Typography,Card,Button } from 'antd';
import { PlusCircleOutlined} from '@ant-design/icons';
import bankIcon from '../../Images/bankIcon.png'
import WalletIcon from '../../Images/wallet.png'

const { Title } = Typography;
const BankOptions = () => {
    return (
        <div>
            <div className="banking-div">
                <div className="banking-headind-div">
                    <Title level={3} style={{margin:".5rem",padding:".5rem"}}><img alt='img' src={bankIcon} height={'30px'}/> Banking and Payment Options</Title>
                </div>
                <hr/>
                <div className="saved-options">
                    <Card
                        title={<strong><img className='crypto-image' alt='img' src={WalletIcon} height={'30px'}/> Saved Methods </strong>}
                        extra={<Button type="primary" shape="circle"><PlusCircleOutlined/></Button>}
                        style={{borderRadius:"2rem",margin:".5rem auto",maxWidth:"500px"}}
                        hoverable
                    >

                        </Card>
                </div>
            </div>
        </div>
    )
}

export default BankOptions
