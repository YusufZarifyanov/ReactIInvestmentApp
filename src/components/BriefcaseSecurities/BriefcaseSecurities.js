import { Card, Avatar, Statistic } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import styles from "./BriefcaseSecurities.module.scss";
// import {
//   EditOutlined,
//   EllipsisOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

// const { Meta } = Card;

const BriefcaseSecurities = ({ data }) => {
  // console.log(data);
  return (
    <div className={styles.content}>
      {data.map((el, i) => (
        <Link
          to={{
            pathname: `/briefcaseItem/${el.name}`,
            dataItem: el,
          }}
          key={i}
          className={styles.link}
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
                <Avatar
                  className={styles.icon}
                  src={el.src}
                />
                <div>
                  <p className={styles.name}>
                    {el.name}
                  </p>
                  <p className={styles.count}>
                    {`${el.count} шт. - ${el.cost} ${el.currency}`}
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

export default BriefcaseSecurities;
