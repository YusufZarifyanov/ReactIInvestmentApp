import React, { useState, useEffect } from "react";
import { Card, Avatar } from "antd";
// import { Chart } from "@antv/g2";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./BriefcaseSecurities.module.scss";

const { Meta } = Card;

const BriefcaseSecurities = ({ location }) => {
  const dataElem = location.dataItem;
  return (
    <div className={styles.container}>
      <Card
        className={styles.card}
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
      <div className={styles.graphic}></div>
    </div>
  );
};

export default BriefcaseSecurities;
