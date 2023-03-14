import React from 'react'
import {Select, Typography, Row,Col, Column, Card} from 'antd'
import moment from 'moment'
import Loader from './Loader'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const {Text, Title} = Typography;
const {Option} = Select;

const News = ({simplified}) => {

  const count = simplified ? 10 : 100;
  const {data:cryptoNews} = useGetCryptoNewsQuery(count);

 
 
  return (
      <Row gutter={[24,24]}>
        {cryptoNews && cryptoNews.length > 0 && cryptoNews.map((news, i)=>(
              <Col xs={24} sm={12} lg={8} key={i}>
                <Card hoverable className='news-card'>
                  <a href={news.url} target="_blank" rel="noreferrer">
                      <div className='news-image-container'>
                        <Title className='news-title' level={4}>{news.title}</Title>
                      </div>
                      <div>
                        <p>
                          {news.description > 100 ? `${news.description.substring(0,100)}...` : news.description}
                        </p>
                      </div>
                      <div>
                       <Text style={{fontWeight:"bold"}}>
                        Published: {moment(news.date).startOf('ss').from()}
                       </Text>
                      </div>
                  </a>
                </Card>
              </Col>
          )) 
          }
      </Row>
  )
}

export default News