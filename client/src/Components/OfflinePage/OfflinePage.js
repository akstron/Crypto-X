import React from 'react'
import { Result, Button,Divider,Typography} from 'antd';
import {BrowserRouter,Link,Switch,Route} from 'react-router-dom'

import brandIcon from '../../Images/main-logo.png'

const OfflinePage = () => {
    return (
        <BrowserRouter basename='/'>
            <Switch>
                <Route>
                    <div style={{backgroundColor:"#f0f2f5",height:"100vh"}}>
                            <img src={brandIcon} alt="logo" style={{display:"inline"}}/>
                            <Typography.Title level={2} className="logo" style={{display:"inline"}}>
                                Baniya-Trade
                            </Typography.Title>
                            <Divider/>
                            <Result
                                status="warning"
                                title="Looks like your are offline. Please check your internet connection."
                                extra={
                                    <Link to='/'>
                                        <Button type="primary" key="console">
                                            Reload
                                        </Button>
                                    </Link>
                                }
                            />
                    </div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default OfflinePage
