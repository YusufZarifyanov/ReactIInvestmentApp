import { List, Statistic } from "antd";
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styles from "./UpsDowns.module.scss";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";

const UpsDowns = ({ data }) => {
  const { pathname } = useLocation()

  const upsDownsTypesArray = data && Object.keys(data)

  return (
    <div className={styles.body}>
      {
        upsDownsTypesArray && upsDownsTypesArray.map((type) => (
          <div key={type} className={styles.card}>
            <div className={styles.elemHeader}>{data[type].name}</div>
            <div className={styles.elem}>
              <List
                dataSource={data[type].data}
                renderItem={(item) => (
                  <Link
                    to={{
                      pathname: `/${getPathPartByOrdinalNumber(pathname, 1)}/${getPathPartByOrdinalNumber(pathname, 2)}/${item.symbol}`,
                      dataItem: item,
                    }}
                  >
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta
                        className={styles.meta}
                        avatar={
                          <img
                            className={styles.img}
                            src={`https://s3.polygon.io/logos/${item?.symbol?.toLowerCase()}/logo.png`}
                            alt={item.longName || item.shortName}
                          ></img>
                        }
                        title={item.longName || item.shortName}
                        description={`${item.regularMarketPrice} ${item.currency || "$"}`}
                      />
                      {item.regularMarketChangePercent > 0 ? (
                        <Statistic
                          className={styles.statistik}
                          // title="Active"
                          value={item.regularMarketChangePercent}
                          precision={2}
                          valueStyle={{ color: "#3f8600" }}
                          prefix={<ArrowUpOutlined />}
                          suffix="%"
                        />
                      ) : (
                        <Statistic
                          className={styles.statistik}
                          // title="Idle"
                          value={item.regularMarketChangePercent}
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
