import { Card, Avatar, Statistic } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./Securities.module.scss";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";

const Securities = ({ data }) => {
  const { pathname } = useLocation()
  console.log(data)
  return (
    <div className={styles.content}>
      {data && data.map((el) => (
        <Link
          to={{
            pathname: `/${getPathPartByOrdinalNumber(pathname, 1)}/${getPathPartByOrdinalNumber(pathname, 2)}/${el.ticker}`,
            dataItem: el,
          }}
          className={styles.link}
          key={el.ticker}
        >
          <Card

          // actions={[
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
          // ]}
          >
            <div className={styles.info}>
              <div className={styles.iconContainer}>
                <Avatar className={styles.icon} src={`https://logo.clearbit.com/${el.symbol}.com`} />
                <div>
                  <p className={styles.name}>{el.shortName}</p>
                  <p className={styles.count}>
                    {
                      getPathPartByOrdinalNumber(pathname, 1) === "briefcase"
                        ? `2 шт. - ${el.regularMarketPrice} $`
                        : `${el.regularMarketPrice} $`
                    }
                  </p>
                </div>
              </div>
              {el.is_active ? (
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
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Securities;
