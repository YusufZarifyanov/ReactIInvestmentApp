import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
// import { Chart } from "@antv/g2";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./BriefcaseSecurities.css";

const { Meta } = Card;

const BriefcaseSecurities = ({ location }) => {
  const dataElem = location.dataItem;
  return (
    <div>
      <div className="container">
        <div className="container__card">
          <Card
            style={{ width: 300 }}
            cover={<img alt="example" src={dataElem.src} />}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              title={dataElem.name}
              description={`${dataElem.count} шт. - ${dataElem.cost} ${dataElem.currency}`}
            />
          </Card>
        </div>

        <div className="container__graphic"></div>
      </div>
    </div>
  );
};

export default BriefcaseSecurities;
