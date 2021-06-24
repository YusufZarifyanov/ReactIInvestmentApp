import styles from "./Overview.module.scss";
import { Layout, List, Spin, Row, Col, Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";
import { useSelector } from "react-redux";

const Overview = ({ data, briefcaseCalculation }) => {
  const loading = useSelector(state => state.securities.topViews.loading);
  
  const { pathname } = useLocation();
  const dataKeys = Object.keys(data);

  if (!briefcaseCalculation && loading) {
    return (
      <Row className={styles.row} gutter={16}>{
        [0, 1, 2, 3].map(item => (
          // todo
          <Col key={item} className={styles.col} xs={24} sm={24} md={12} lg={12} xl={12} xxl={6}>
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
                            <img
                              className={styles.img}
                              src={`https://s3.polygon.io/logos/${item?.symbol?.toLowerCase()}/logo.png`}
                              alt={item.symbol}
                            ></img>
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
