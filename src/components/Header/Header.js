import React, { useState } from "react";
import {
  Layout,
  Menu,
  Typography,
} from "antd";
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
    name: "Мой Портфель",
    path: "/briefcase/review",
    icon: <ShoppingFilled />,
  },
  {
    name: "Витрина",
    path: "/showcase/topviews",
    icon: <AppstoreFilled />,
  },
  {
    name: "О программе",
    path: "/about",
    icon: <QuestionCircleFilled />,
  },
];

const Header = ({ location }) => {
  const currentPath = location.pathname;
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
        onClick={handleActiveBurger} >
        {activeBurger ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={[currentPath]}
        className={cn('header__menu', activeBurger ? 'active' : '')}
        onClick={setActiveBurgerToFalse}
      >
        {menuItems.map(item => (
          <Menu.Item className="header__menuItem" key={item.path} icon={item.icon}>
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
