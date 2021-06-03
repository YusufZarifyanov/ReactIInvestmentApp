import styles from "./Overview.module.scss";
import { Layout, List } from "antd";
import { Link } from "react-router-dom";

const Overview = ({ data, briefcaseCalculation }) => {
  const securities = Object.keys(data)

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
                          pathname: `/briefcaseItem/${security}/${item.tiker}`,
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
                            description={briefcaseCalculation ? `${item.count} шт. - ${item.cost} ${item.currency}` : `${item.cost} ${item.currency}`}
                          />
                          {
                            briefcaseCalculation && <div>{`${item.count * item.cost} ${item.currency}`}</div>
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
