import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const SideBar = ({ menuItems, active }) => {

  return (
    <Layout.Sider style={{backgroundColor: 'white'}}>
      <Menu
        mode="inline"
        selectedKeys={[`${active}`]}
      >
        {menuItems && menuItems.map(el => (
          <Menu.Item key={el.path} icon={el.icon}>
            <Link to={el.path}>{el.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
};

export default SideBar;
