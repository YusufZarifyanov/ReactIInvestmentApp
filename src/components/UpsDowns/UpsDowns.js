import { List, Statistic } from "antd";
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styles from "./UpsDowns.module.scss";

const UpsDowns = ({ data }) => {
  const { pathname } = useLocation()

  const upsDownsTypesArray = Object.keys(data)

  return (
    <div className={styles.body}>
      {
        upsDownsTypesArray.map((type) => (
          <div key={type} className={styles.card}>
            <div className={styles.elemHeader}>{data[type].name}</div>
            <div className={styles.elem}>
              <List
                dataSource={data[type].data}
                renderItem={(item) => (
                  <Link
                    to={{
                      pathname: `/${pathname.split('/')[1]}/${pathname.split('/')[2]}/${item.tiker}`,
                      dataItem: item,
                    }}
                  >
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta
                        className={styles.meta}
                        avatar={
                          <img
                            className={styles.img}
                            src={item.src}
                            alt={item.name}
                          ></img>
                        }
                        title={item.name}
                        description={`${item.cost} ${item.currency}`}
                      />
                      {item.is_active ? (
                        <Statistic
                          className={styles.statistik}
                          // title="Active"
                          value={11.28}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      ) : (
                        <Statistic
                          className={styles.statistik}
                          // title="Idle"
                          value={9.3}
                          precision={2}
                          valueStyle={{ color: "#cf1322" }}
                          prefix={<ArrowDownOutlined />}
                          suffix="%"
                        />
                      )}
                    </List.Item>
                  </Link>
                )}
              />
            </div>
            <div className={styles.makeColumnTall}></div>
          </div>
        ))
      }
    </div>
  )
}

export default UpsDowns
