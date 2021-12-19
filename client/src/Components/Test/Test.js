import React from 'react'
import { Typography,Divider } from 'antd';
import portfolioIcon from '../../Images/portfolioIcon.png'
const { Title } = Typography;

const Test = () => {

    return (
        <div>
            <div className="portfolio-div">
                <div className="portfolio-heading-div">
                    <Title level={2}>
                        <img src={portfolioIcon} alt='ImgIcon' height={'50px'} style={{margin:'0rem .8rem '}}/>
                        Porfolio
                    </Title>
                    <Divider/>
                </div>
            </div>
        </div>
    )
}

export default Test
