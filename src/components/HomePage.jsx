import React from 'react'
import millify from 'millify'
import {Typography,Row,Col,Statistic} from "antd"
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';


const {Title} = Typography;

const HomePage = () => {
  const {data, isFetching} = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if(isFetching) return <Loader />;



  return (
     <>
      <Title level={2} className="heading">
        Global Crypto Statistics
      </Title>
      <Row>
        <Col span={12}>
        <Statistic title="Total Crypto Currencies" value={globalStats.total}/>
        <Statistic title="Total Crypto Exchanges" value={millify(globalStats.totalExchanges)}/>
        <Statistic title="Total Crypto Market Cap" value={millify(globalStats.totalMarketCap)}/>
        <Statistic title="Total Crypto 24h Volume" value={millify(globalStats.total24hVolume)}/>
        <Statistic title="Total Crypto Markets" value={millify(globalStats.totalMarkets)}/>
      </Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className="home-title">Top Ten Cryptocurrencies</Title>
        <Title level={3} className="show-more"><Link to="./cryptocurrencies">Show more</Link></Title>
      </div>

      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest crypto news</Title>
        <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
      </div>

      <News simplified />
      
     </>
  )
}

export default HomePage