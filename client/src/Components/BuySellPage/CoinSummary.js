import React from 'react'
import { Card,Row,Col,Statistic} from 'antd';
import millify from 'millify';
import moment from 'moment'
const CoinSummary = ({coin}) => {
    return (
        <div>
            <Card
                title={"Selected Coin : "+ (coin.name)}
                extra={<img className='crypto-image' alt='img' src={coin.iconUrl} height={'35px'}/>}
                style={{margin:"1rem auto",width:"fit-content"}}
                hoverable>

                    <Row>
                        <Col span={8}><Statistic title="Price" value={"$"+millify(coin?.price)} /></Col>
                        <Col span={8} style={{display:"inline"}}><Statistic title="Change" value={millify(coin?.change)+"%"} style={{display:"inline"}}/></Col>
                        <Col span={8}><Statistic title="Market Cap" value={millify(coin?.marketCap)}/></Col>
                        <Col span={8}><Statistic title="Volume" value={millify(coin?.volume)}/></Col>
                        <Col span={8}><Statistic title="All Time High" value={"$"+millify(coin?.allTimeHigh.price)}/></Col>
                        <Col span={8}><Statistic title="Listed" value={moment(coin?.listedAt*1000).startOf('ss').fromNow()}/></Col>
                    </Row> 
                </Card>
        </div>
    )
}

export default CoinSummary
