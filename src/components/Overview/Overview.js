import styles from "./Overview.module.scss";
import { Layout, List, Spin } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";

const Overview = ({ data, briefcaseCalculation }) => {
  console.log(data);
  const { pathname } = useLocation();
  const dataKeys = Object.keys(data);

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
                        )}/${getPathPartByOrdinalNumber(pathname, 2)}/${
                          item.symbol
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
                              src={`https://s3.polygon.io/logos/${item.symbol.toLowerCase()}/logo.png`}
                              alt={item.symbol}
                            ></img>
                          }
                          title={item.symbol}
                          description={
                            briefcaseCalculation
                              ? `${2} шт. - ${item.regularMarketPrice} $`
                              : `${item.regularMarketPrice} $`
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
