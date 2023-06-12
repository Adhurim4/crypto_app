import React from 'react'
import {Line} from "react-chartjs-2"
import {Col, Row, Typography} from "antd";
import moment from 'moment';
const {Title} = Typography;

const LineChart = ({coinHistory, currentPrice,coinName}) => {

    const coinPrice = [];
    const coinTimeStamp = [];
  
    if (!coinHistory?.data?.history?.length) {
        return null; // Exit early if coinHistory is empty or undefined
      }
    
      for (let i = 0; i < coinHistory.data.history.length; i += 1) {
        const historyItem = coinHistory.data.history[i];
        if (historyItem) {
          coinPrice.push(historyItem.price);
          coinTimeStamp.push(moment.unix(coinHistory?.data?.history[i].timestamp).format('YYYY-MM-DD'));
        }
      }
 
    
  if (!coinPrice.length || !coinTimeStamp.length) {
    return null; // Exit early if coinPrice or coinTimeStamp is empty
  }
 
  
    const data = {
        labels: coinTimeStamp.reverse(),
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice.reverse(),
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd'
          },
        ],
      };

      const options = {
        
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };


  return (
    <>
    <Row className='chart-header'>
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className='price-container'>
            <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
            </Title>
            <Title level={5} className="current-price ">
                Current {coinName} Price : $ {currentPrice}
            </Title>
        </Col>
    </Row>
     <Line data={data} options={options} /> 
    </>
  )
}

export default LineChart