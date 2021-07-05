import { List, Statistic, Row, Col, Skeleton } from "antd";
import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import styles from "./UpsDowns.module.scss";
import { getPathPartByOrdinalNumber } from '../../utils/getPathPartByOrdinalNumber';
import { useSelector } from "react-redux";

const UpsDowns = ({ data }) => {
  const loading = useSelector(state => state.securities.loading);

  const { pathname } = useLocation()

  const upsDownsTypesArray = data && Object.keys(data)

  if (loading) {
    return (
      <Row className={styles.row} gutter={16}>{
        [0, 1].map(item => (
          <Col key={item} className={styles.col} xs={24} md={12}>
            <Skeleton.Button className={styles.skeletonTitle} active={true} />
            <Skeleton
              active={true}
              avatar
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
                          <div className={styles.imgWrapper}>
                            <img
                              className={styles.img}
                              src={`${process.env.REACT_APP_POLYGON_FOR_LOGO}${item?.symbol?.toLowerCase()}/logo.png`}
                              alt={item.symbol}
                            />
                          </div>
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
