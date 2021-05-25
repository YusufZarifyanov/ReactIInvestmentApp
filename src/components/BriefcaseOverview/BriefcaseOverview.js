import "./BriefcaseOverview.css";
import { Layout, List, Card } from "antd";


const BriefcaseOverview = ({ activeMenuItem, data }) => {
  return (
    <Layout.Content>
      <div className="main_content">
        <div className="briefcase_header">
          <div className="briefcase_header__totalSum">
            <h1>Общая сумма = 1000 $</h1>
          </div>
        </div>
        <div className="briefcase_body">
          <div className="briefcase_body__card">
            <div className="briefcase_body__elem__header">Валюта</div>
            <div className="briefcase_body__elem">
              <List
                dataSource={data.data_currency}
                renderItem={(item) => (
                  <List.Item className="briefcase_body__elem__list_item">
                    <List.Item.Meta
                      avatar={
                        <img
                          className="briefcase_body__elem__img"
                          src={item.src}
                        ></img>
                      }
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />{" "}
            </div>
          </div>
          <div className="briefcase_body__card">
            <div className="briefcase_body__elem__header">Акции</div>
            <div className="briefcase_body__elem">
              <List
                dataSource={data.data_shares}
                renderItem={(item) => (
                  <List.Item className="briefcase_body__elem__list_item">
                    <List.Item.Meta
                      avatar={
                        <img
                          className="briefcase_body__elem__img"
                          src={item.src}
                        ></img>
                      }
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className="briefcase_body__card">
            <div className="briefcase_body__elem__header">Облигации</div>
            <div className="briefcase_body__elem">
              <List
                dataSource={data.data_bonds}
                renderItem={(item) => (
                  <List.Item className="briefcase_body__elem__list_item">
                    <List.Item.Meta
                      avatar={
                        <img
                          className="briefcase_body__elem__img"
                          src={item.src}
                        ></img>
                      }
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <div className="briefcase_body__card">
            <div className="briefcase_body__elem__header">Фонды</div>
            <div className="briefcase_body__elem">
              <List
                dataSource={data.data_fonds}
                renderItem={(item) => (
                  <List.Item className="briefcase_body__elem__list_item">
                    <List.Item.Meta
                      avatar={
                        <img
                          className="briefcase_body__elem__img"
                          src={item.src}
                        ></img>
                      }
                      title={item.name}
                      description={`${item.count} шт. - ${item.cost} ${item.currency}`}
                    />
                    <div>{`${item.count * item.cost} ${item.currency}`}</div>
                  </List.Item>
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
