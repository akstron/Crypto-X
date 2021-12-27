export const returnData=(coinPrice)=>{
    const data = {
        labels: coinPrice.timeStamp,
        datasets: [
        {
            label: 'Price In USD',
            data: coinPrice.price,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
        },
        ],
    };

    return data;
}

export const returnOption=(coinPrice)=>{
    const options = {
        animation:false,
        plugins: {
            legend: {
            display: false
            },
            title:'Custom'
        },
        elements: {
            line: {
                tension: 0.2
            }
        },
        scales: {
        x: {
            legend: {
                display: false
            },
            grid:{
                display:false
            }
        },
        y: {
            legend: {
                display: false
            },
            grid:{
                display:false
            }
        },
     
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },  
        pointRadius: 2,
        pointHoverRadius: 1,
        responsive: true,
        maintainAspectRatio:true,
    };
    return options;
}
