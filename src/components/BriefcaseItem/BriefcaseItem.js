import { Card, Avatar, Statistic } from "antd";
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
        <Card
          className="overview_mainContent__card"
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar src={el.src} />}
            title={el.name}
            description="This is the description"
          />
          <div style={{ display: "flex" }}>
            <Statistic
            style={{margin: '10px'}}
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
            <Statistic
            style={{margin: '10px'}}
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BriefcaseItem;
