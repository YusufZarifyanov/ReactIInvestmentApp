import React from 'react';
import { List, Card, Skeleton, Row, Col } from "antd";
import placeholder from '../../placeholder_img.png';
import styles from './Events.module.scss';

const Events = ({ data }) => {

  if (!data?.length) {
    return (
      <Row className={styles.row} gutter={16}>{
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(item => (
          <Col key={item} xs={24} sm={12} md={12} lg={8} xl={8} xxl={6}>
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
      className={styles.list}
      pagination={data?.length ? {
        onChange: page => {
          // console.log(page);
        },
        pageSize: 12,
        itemLayout: "vertical"
      } : false}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={data && data}
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
