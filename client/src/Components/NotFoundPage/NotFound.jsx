import React from 'react'
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

const NotFound = () => {

    const history = useHistory();

    const goToHome=()=>{
        history.push('/')
    }
    return (
        <div>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={goToHome}>Back Home</Button>}
                />,
        </div>
    )
}

export default NotFound;
