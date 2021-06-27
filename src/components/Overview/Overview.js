import styles from "./Overview.module.scss";
import { Layout, List, Spin, Row, Col, Skeleton, Statistic } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getPathPartByOrdinalNumber } from "../../utils/getPathPartByOrdinalNumber";
import { useSelector } from "react-redux";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

const Overview = ({ data, briefcaseCalculation }) => {
  const topViewsLoading = useSelector(state => state.securities.topViews.loading);
  const myBriefcaseLoading = useSelector(state => state.securities.myBriefcase.loading);

  const { pathname } = useLocation();
  const dataKeys = Object.keys(data);

  if (topViewsLoading || myBriefcaseLoading) {
    return (
      <Layout.Content>
        {
          briefcaseCalculation && <Skeleton.Button className={styles.skeletonBriefcaseTitle} active={true} />
        }
        <Row className={styles.row} gutter={16}>{
          [0, 1, 2, 3].map(item => (
            <Col key={item} xs={24} md={12} xl={6}>
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
      </Layout.Content>
    )
  }

  return (
    <Layout.Content>
      {/* {loading ? (
      <div className={styles.spin}>
        <Spin size="large"/>
      </div>
      ) : ( */}
      <div className={styles.main}>
        {briefcaseCalculation && (
          <div className={styles.headerTotalSum}>
            <h1>Общая сумма: {briefcaseCalculation.amount} $</h1>
          </div>
        )}
        <div className={styles.body}>
          {dataKeys.map((securityKey) => (
            <div key={securityKey} className={styles.card}>
              <div className={styles.elemHeader}>{data[securityKey].name}</div>
              <div className={styles.elem}>
                <List
                  dataSource={data[securityKey].data}
                  renderItem={(item) => (
                    <Link
                      to={{
                        pathname: `/${getPathPartByOrdinalNumber(
                          pathname,
                          1
                        )}/${getPathPartByOrdinalNumber(pathname, 2)}/${item.symbol
                          }`,
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
                                src={`https://s3.polygon.io/logos/${item?.symbol?.toLowerCase()}/logo.png`}
                                alt={item.symbol}
                              />
                            </div>
                          }
                          title={briefcaseCalculation ? item.symbol : item.name}
                          description={
                            briefcaseCalculation
                              ? `${2} шт. - ${item.regularMarketPrice} $`
                              : `${item.cost} $`
                          }
                        />
                        {briefcaseCalculation && (
                          <div>{`${2 * item.regularMarketPrice} $`}</div>
                        )}
                        {!briefcaseCalculation && (item.is_active ? (
                          <Statistic
                            value={11.28}
                            precision={2}
                            valueStyle={{ color: "#3f8600", fontSize: "1rem" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                          />
                        ) : (
                          <Statistic
                            value={9.3}
                            precision={2}
                            valueStyle={{ color: "#cf1322", fontSize: "1rem" }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                          />
                        ))}
                      </List.Item>
                    </Link>
                  )}
                />
              </div>
              <div className={styles.makeColumnTall}></div>
            </div>
          ))}
        </div>
      </div>
      {/* )} */}
    </Layout.Content>
  );
};

export default Overview;
