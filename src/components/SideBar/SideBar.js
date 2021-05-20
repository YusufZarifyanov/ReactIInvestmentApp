import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const SideBar = ({ menuItems, activeMenuItem }) => (
  <Layout.Sider style={{ backgroundColor: 'white' }}>
    <Menu
      mode="inline"
      selectedKeys={[activeMenuItem]}
    >
      {menuItems.map(item => (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path}>{item.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  </Layout.Sider>
);

export default SideBar;
