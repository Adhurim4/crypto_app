import React, { useEffect, useRef } from 'react';
import { Typography, Row, Col } from 'antd';
import Chart from 'chart.js/auto';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName, timePeriod }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (coinHistory && currentPrice) {
      const ctx = chartRef.current.getContext('2d');
      const coinPrice = coinHistory.data.history.map((historyItem) => historyItem.price);
      const coinTimestamp = coinHistory.data.history.map((historyItem) => new Date(historyItem.timestamp * 1000).toLocaleDateString());

      const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options,
      });
    }
  }, [coinHistory, currentPrice, timePeriod]);

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart</Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <canvas ref={chartRef} />
    </>
  );
};

export default LineChart;
