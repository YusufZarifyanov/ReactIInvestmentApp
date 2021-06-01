import styles from "./BriefcaseOverview.module.scss";
// import { Layout, List, Card } from "antd";
import { Layout, List } from "antd";
import { Link } from "react-router-dom";

const BriefcaseOverview = ({ activeMenuItem, data }) => {
  return (
    <Layout.Content>
      <div className={styles.main}>
        <div className={styles.headerTotalSum}>
          <h1>Общая сумма = 1000 $</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.card}>
            <div className={styles.elemHeader}>Валюта</div>
            <div className={styles.elem}>
              <List
                dataSource={data.currency}
                renderItem={(item) => (
                  <Link
                    to={{
                      pathname: `/briefcaseItem/${item.name}`,
                      dataItem: item,
                    }}
                  >
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta
                        avatar={
                          <img
                            className={styles.img}
                            src={item.src}
                            alt={item.src} ></img>
                        }
                        title={item.name}
                        description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                      />
                      <div>{`${item.count * item.cost} ${item.currency}`}</div>
                    </List.Item>
                  </Link>
                )}
              />{" "}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.elemHeader}>Акции</div>
            <div className={styles.elem}>
              <List
                dataSource={data.shares}
                renderItem={(item) => (
                  <Link
                    to={{
                      pathname: `/briefcaseItem/${item.name}`,
                      dataItem: item,
                    }}
                  >
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta
                        avatar={
                          <img
                            className={styles.img}
                            src={item.src}
                            alt={item.src} ></img>
                        }
                        title={item.name}
                        description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                      />
                      <div>{`${item.count * item.cost} ${item.currency}`}</div>
                    </List.Item>
                  </Link>
                )}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.elemHeader}>Облигации</div>
            <div className={styles.elem}>

              <List
                dataSource={data.bonds}
                renderItem={(item) => (
                  <Link
                    to={{
                      pathname: `/briefcaseItem/${item.name}`,
                      dataItem: item,
                    }}
                  >
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta
                        avatar={
                          <img
                            className={styles.img}
                            src={item.src}
                            alt={item.src} ></img>
                        }
                        title={item.name}
                        description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                      />
                      <div>{`${item.count * item.cost} ${item.currency}`}</div>
                    </List.Item>
                  </Link>
                )}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.elemHeader}>Фонды</div>
            <div className={styles.elem}>

              <List
                dataSource={data.funds}
                renderItem={(item) => (
                  <Link
                    to={{
                      pathname: `/briefcaseItem/${item.name}`,
                      dataItem: item,
                    }}
                  >
                    <List.Item className={styles.listItem}>
                      <List.Item.Meta
                        avatar={
                          <img
                            className={styles.img}
                            src={item.src}
                            alt={item.src} ></img>
                        }
                        title={item.name}
                        description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                      />
                      <div>{`${item.count * item.cost} ${item.currency}`}</div>
                    </List.Item>
                  </Link>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout.Content>
  );
};

export default BriefcaseOverview;
