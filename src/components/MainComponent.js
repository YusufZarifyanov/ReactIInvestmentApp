import { Layout, Menu } from "antd";


const { Content, Sider } = Layout;

const MainComponent = () => {
  return (
    <>
      <Layout>
        <Sider>
          <Menu
            className="sidebar_block"
            mode="inline"
            defaultSelectedKeys={["4"]}
          >
            <Menu.Item key="1">Валюта</Menu.Item>
            <Menu.Item key="2">Акции</Menu.Item>
            <Menu.Item key="3">Облигации</Menu.Item>
            <Menu.Item key="4">Фонды</Menu.Item>
          </Menu>
        </Sider>
        <Content className="content_block">
          <div className="content_block__elem">content</div>
        </Content>
      </Layout>
    </>
  );
};

export default MainComponent
