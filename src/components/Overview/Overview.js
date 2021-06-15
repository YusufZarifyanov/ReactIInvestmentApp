import styles from "./Overview.module.scss";
import { Layout, List } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";

const Overview = ({ data, briefcaseCalculation }) => {
  console.log(data)
  const securities = Object.keys(data)
  const { pathname } = useLocation()
  
  return (
    <Layout.Content>
      <div className={styles.main}>
        {
          briefcaseCalculation &&
          <div className={styles.headerTotalSum}>
            <h1>Общая сумма: {briefcaseCalculation.amount} $</h1>
          </div>
        }
        <div className={styles.body}>
          {
            securities.map((security) => (
              <div key={security} className={styles.card}>
                <div className={styles.elemHeader}>{data[security].name}</div>
                <div className={styles.elem}>
                  <List
                    dataSource={data[security].data}
                    renderItem={(item) => (
                      <Link
                        to={{
                          pathname: `/${getPathPartByOrdinalNumber(pathname, 1)}/${getPathPartByOrdinalNumber(pathname, 2)}/${item.ticker}`,
                          dataItem: item,
                        }}
                      >
                        <List.Item className={styles.listItem}>
                          <List.Item.Meta
                            className={styles.meta}
                            avatar={
                              <img
                                className={styles.img}
                                src={item.logo}
                                alt={item.ticker}
                              ></img>
                            }
                            title={item.ticker}
                            description={briefcaseCalculation ? `${item.count} шт. - ${item["Global Quote"]["02. open"]} $` : `${item.cost} $`}
                          />
                          {
                            briefcaseCalculation && <div>{`${item.count * item["Global Quote"]["02. open"]} $`}</div>
                          }
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
      </div>
    </Layout.Content>
  );
};

export default Overview;
