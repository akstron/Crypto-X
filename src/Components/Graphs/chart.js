import React from "react";
import { Line } from 'react-chartjs-2';

const Chart =({data,options})=>{    
   
    return (
        <>
            <div className='header'>
            <h1 className='title'>Price</h1>
            </div>
            <Line data={data} options={options} />
        </>
    );
    
}

export default Chart;