import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideBar = ({ menuItems, active }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(menuItems.find(item => item.path === active)?.path)

  useEffect(() => {
    setActiveMenuItem(menuItems.find(item => item.path === active)?.path)
  },[active])

  return (
    <Layout.Sider>
      <Menu
        className="sidebar_block"
        mode="inline"
        selectedKeys={[`${activeMenuItem && activeMenuItem}`]}
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
