import "./ContentWindow.css";
import { Layout, List, Card } from "antd";
import {
  AppleFilled,
  BankOutlined,
  ArrowUpOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const data = [
  {
    name: "Apple",
    count: 4,
    cost: 124.83,
    currency: "$",
    icon: <AppleFilled />,
  },
  {
    name: "Bank of America Corp",
    count: 3,
    cost: 41.92,
    currency: "$",
    icon: <BankOutlined />,
  },
  {
    name: "TESLA",
    count: 2,
    cost: 41.92,
    currency: "$",
    icon: <ArrowUpOutlined />,
  },
  {
    name: "Twitter",
    count: 1,
    cost: 41.92,
    currency: "$",
    icon: <TwitterOutlined />,
  },
  
];

const ContentWindow = ({ children }) => {
  return (
    <Layout.Content>
      <div className="main_content">
        <div className="briefcase_header">
          <div className="briefcase_header__totalSum">
            <h1>Общая сумма</h1>
          </div>
        </div>
        <div className="briefcase_body">
          <div className="briefcase_body__elem currency">
            <Card
              title={<div className="briefcase_body__elem__header">Валюта</div>}
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
          <div className="briefcase_body__elem promotions">
            <Card
              title={<div className="briefcase_body__elem__header">Акции</div>}
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
          <div className="briefcase_body__elem bonds">
            <Card
              title={<div className="briefcase_body__elem__header">Облигации</div>}
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
          <div className="briefcase_body__elem fonds">
            <Card
              title={<div className="briefcase_body__elem__header">Фонды</div>}
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon}
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </div>
      </div>
    </Layout.Content>
  );
};

export default ContentWindow;
