import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  AppstoreFilled,
  CloseOutlined,
  MenuOutlined,
  QuestionCircleFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import cn from 'classnames'
import './Header.css'

const menuItems = [
  {
    path: "/briefcase",
    icon: <ShoppingFilled />,
  },
  {
    path: "/showcase",
    icon: <AppstoreFilled />,
  },
  {
  path: "/about",
  icon: <QuestionCircleFilled />,
  },
];

const Header = ({location, routes}) => {
  const currentPath = location.pathname
  const activeMenuItem = '/' + currentPath.split('/')[1]

  const [activeBurger, setActiveBurger] = useState(false)

  function handleActiveBurger() {
    setActiveBurger(!activeBurger)
  }

  function setActiveBurgerToFalse() {
    setActiveBurger(false)
  }

  return (
    <Layout.Header
      className='header'
    >
      <Link to="/">
        <Typography.Title onClick={setActiveBurgerToFalse}
          style={{
            fontSize: 24,
            lineHeight: "32px",
            color: "#fff",
            marginBottom: 0,
            flex: "0 0 168px",
            cursor: "pointer",
          }}
        >
          IZI Investment
      </Typography.Title>
      </Link>
      <div
        className='header__burgerBtn'
        onClick={handleActiveBurger}
      >
        {activeBurger ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[`${activeMenuItem}`]}
        className={cn('header__menu', activeBurger ? 'active' : '')}
        onClick={setActiveBurgerToFalse}
      >{routes && routes.map(item => (
        <Menu.Item className="header__menuItem" key={item.path} icon={menuItems.find(menuItem => menuItem.path === item.path).icon}>
          <Link to={item.path}>
            {item.name}
          </Link>
        </Menu.Item>
      ))}
      </Menu>
    </Layout.Header>
  );
}

export default withRouter(Header);
