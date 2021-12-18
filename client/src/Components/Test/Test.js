import React,{useState,useEffect} from 'react'
import { Progress } from 'antd';

const Test = () => {
    const [status,setStatus] = useState(0);

    useEffect(() => {
        let isComponentMounted=true;
        if(isComponentMounted) setInterval(() => {
            setStatus(oldStatus=>oldStatus+1);
        }, 50);
        return () => {
            isComponentMounted=false;
        }
    }, [])

    return (
        <div>
            <h2>this is test area :: - </h2>
            <Progress
                type='circle'
                strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                }}
                percent={status}
                />
        </div>
    )
}

export default Test
