import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const SideBar = ({menuItems, routes, active }) => {

  return (
    <Layout.Sider style={{backgroundColor: 'white'}}>
      <Menu
        mode="inline"
        selectedKeys={[`${active}`]}
      >
        {routes && routes.map(el => (
          <Menu.Item key={el.path} icon={menuItems.find(item => item.path === el.path).icon}>
            <Link to={el.path}>{el.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};

export default SideBar;
