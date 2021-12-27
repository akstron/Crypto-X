import React from 'react'
import { Tabs,Card } from 'antd';
import CoinPlot from "./CoinPlot.js"
import CoinLivePlot from "./CoinLivePlot"

const { TabPane } = Tabs;

const StatsPlot = ({coinId,coinDetails}) => {
    return (
        <Card style={{margin:"1rem auto"}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Previous Trends" key="1">
                    <CoinPlot coinId={coinId} coinDetails={coinDetails}/>
                </TabPane>
                <TabPane tab="Live Data" key="2">
                    <CoinLivePlot coinSymbol={coinDetails.symbol}/>
                </TabPane>
            </Tabs>
        </Card>
    )
}

export default StatsPlot
