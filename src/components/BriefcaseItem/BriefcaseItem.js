import { Card, Avatar, Statistic } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import "./BriefcaseItem.css";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const { Meta } = Card;

const BriefcaseItem = ({ data }) => {
  console.log(data);
  return (
    <div className="overview_mainContent">
      {data.map((el) => (
        <Link
          to={{
            pathname: `/briefcaseSecurities/${el.name}`,
            dataItem: el,
          }}
          className="overview_mainContent__card"
        >
          <Card

          // actions={[
          //   <SettingOutlined key="setting" />,
          //   <EditOutlined key="edit" />,
          //   <EllipsisOutlined key="ellipsis" />,
          // ]}
          >
            <div className="overview_mainContent__card_info">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Avatar
                  className="overview_mainContent__card_icon"
                  src={el.src}
                />
                <div>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      marginBottom: "5px",
                    }}
                  >
                    {el.name}
                  </p>
                  <p
                    style={{ fontSize: "12px" }}
                  >{`${el.count} шт. - ${el.cost} ${el.currency}`}</p>
                </div>
              </div>
              {/* <Meta
                  avatar={
                    <Avatar
                      className="overview_mainContent__card_icon"
                      src={el.src}
                    />
                  }
                  title={el.name}
                  description={`${el.count} шт. - ${el.cost} ${el.currency}`}
                  style={{ width: "100%" }}
                /> */}
              {el.is_active ? (
                <Statistic
                  style={{ textAlign: "center", marginTop: "0.5rem" }}
                  // title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              ) : (
                <Statistic
                  style={{ textAlign: "center", marginTop: "0.5rem" }}
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

export default BriefcaseItem;
