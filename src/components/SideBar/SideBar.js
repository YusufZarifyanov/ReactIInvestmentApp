import { Layout } from "antd";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import styles from './SideBar.module.scss';

const SideBar = ({ menuItems }) => {
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
      collapsedWidth={0.01}
      className={styles.sider}
      breakpoint="sm"
      onBreakpoint={onBreakpoint}
    >
      <ul
        className={styles.menu}
      >
        <span
          className={styles.burgerBtn}
          onClick={toggle}
        >
          {collapsed ? <RightOutlined /> : <LeftOutlined />}
        </span>
        {menuItems.map(item => (
          <li
            key={item.path}
            className={styles.menuItem}
            onClick={isOnBreakpoint ? setCollapsedToTrue : undefined}
          >
            <NavLink
              className={styles.menuLink}
              activeClassName={styles.selected}
              to={item.path}
            >
              <span>
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </Layout.Sider>
  )
};

export default SideBar;