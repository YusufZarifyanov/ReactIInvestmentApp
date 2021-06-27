import { Card, Avatar, Statistic } from "antd";
import { Link, useLocation } from "react-router-dom";
import styles from "./Securities.module.scss";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { getPathPartByOrdinalNumber } from "../../utils/getPathPartByOrdinalNumber";

const Securities = ({ data }) => {
  const { pathname } = useLocation()
  
  return (
    <div className={styles.content}>
      {data && data.map((el, index) => (
        <Link
          to={{
            pathname: `/${getPathPartByOrdinalNumber(pathname, 1)}/${getPathPartByOrdinalNumber(pathname, 2)}/${el.symbol}`,
            dataItem: el,
          }}
          className={styles.link}
          key={index}
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
                <Avatar className={styles.icon} src={`https://eodhistoricaldata.com/img/logos/US/${el.symbol}.png`} />
                <div>
                  <p className={styles.name}>{getPathPartByOrdinalNumber(pathname, 1) === "briefcase" ? el.shortName : el.name}</p>
                  <p className={styles.count}>
                    {
                      getPathPartByOrdinalNumber(pathname, 1) === "briefcase"
                        ? `2 шт. - ${el.regularMarketPrice} $`
                        : `${el.cost} $`
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
