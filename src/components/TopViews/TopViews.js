import React from 'react';
import { List, Card } from "antd";

const TopViews = ({ data }) => {
    return (
      <List
        dataSource={data}
        renderItem={(item) => (
          <Card
            hoverable
            style={{ width: 200 }}
            cover={<img alt={item.name} src={item.src} />}
          >
            <Card.Meta title={item.name} description={item.cost} />
          </Card>
        )}
      />
    )
  }

export default TopViews
