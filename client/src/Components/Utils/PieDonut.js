import React from "react";
import './PieDonut.css'
import { Typography,} from 'antd';

import { Doughnut} from "react-chartjs-2";
import { chartColors } from "./colors";

const {Title} =Typography

const options = {

  elements: {
    arc: {
      borderWidth: 0
    }
  },
  responsive: true,
  maintainAspectRatio: true,
  plugins:{
    legend: {
      display: true,
      position: "bottom"
    },
  }
};

const styles = {
  relative: {
    width:'220px',
    margin:"1rem auto",
  }
};

const PieDonut = ({CoinsName,CoinsData,Heading}) => {

    const data = {
      maintainAspectRatio: true,
      responsive: true,
      labels: CoinsName,
      datasets: [
        {
          data:CoinsData,
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors
        }
      ]
    };

    return (
        <div className="pieDonut-chart">
          <div style={styles.relative}>
              <Title level={4}>{Heading}</Title>
              <Doughnut data={data} options={options} style={{zIndex:"2"}}/>
          </div>
        </div>
    )
}

export default PieDonut
