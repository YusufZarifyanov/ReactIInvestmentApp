import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import styles from './SideBar.module.scss'

const SideBar = ({ menuItems, activeMenuItem }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [isOnBreakpoint, setIsOnBreakpoint] = useState(false)

  function toggle() {
    setCollapsed(!collapsed)
  }

  function onBreakpoint(onBreakpoint) {
    onBreakpoint ? setCollapsed(true) : setCollapsed(false)
    onBreakpoint ? setIsOnBreakpoint(true) : setIsOnBreakpoint(false)
  }

  function setCollapsedToTrue() {
    setCollapsed(true)
  }

  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={1}
      className={styles.sider}
      breakpoint="sm"
      onBreakpoint={onBreakpoint}
    >
      <Menu
        className={styles.menu}
        mode="inline"
        selectedKeys={[activeMenuItem]}
      >
        <span
          className={styles.burgerBtn}
          onClick={toggle}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </span>
        {menuItems.map(item => (
          <Menu.Item
            key={item.path}
            icon={item.icon}
            onClick={isOnBreakpoint && setCollapsedToTrue}
          >
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  )
};

export default SideBar;