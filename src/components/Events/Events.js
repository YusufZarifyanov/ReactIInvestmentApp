import React, { useEffect, useState } from 'react';
import { List, Card, Skeleton, Row, Col } from "antd";
import placeholder from '../../placeholder_img.png'

const Events = ({ data }) => {

  const [fetchData, setFetchData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/news/v2/list?region=US&snippetCount=28", {
        method: "POST",
        headers: {
          "content-type": "text/plain",
          "x-rapidapi-key": "cf6ea43f25msh23327306488aa7bp1c5258jsn0b77144eed9b",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        },
        body: ""
      })
      const result = await response.json()
      setFetchData(result.data.main.stream)
    }
    fetchData()
  }, [])

  if (!fetchData.length) {
    return (
      <Row style={{ margin: 16 }} gutter={16}>{
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => (
          <Col xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
            <Skeleton.Image />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 2,
              }}
            >
            </Skeleton>
          </Col>
        ))
      }
      </Row>
    )
  }

  return (
    <List
      style={{ margin: 16 }}
      pagination={{
        onChange: page => {
          // console.log(page);
        },
        pageSize: 12,
      }}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={fetchData && fetchData}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            cover={
              <img
                alt={item.content.title}
                src={item.content.thumbnail ? item.content.thumbnail?.resolutions[3].url : placeholder} />
            }
          >
            <Card.Meta title={item.content.title} description={item.content.pubDate} />
          </Card>
        </List.Item>
      )}
    />
  )
}

export default Events
