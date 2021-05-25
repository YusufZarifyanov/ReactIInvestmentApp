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
  const menuSelectItems = [];

  const mainMenu = menuItems.map(item => {
    if (item.path.split('/')[1] === currentPath.split('/')[1]) {
      menuSelectItems.push(item.path);
    };
    return (
      <Menu.Item className="header__menuItem" key={item.path} icon={item.icon}>
        <Link to={item.path}>
          {item.name}
        </Link>
      </Menu.Item>
    )
  })

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
      <Link to="/" className="header__link">
        <Typography.Title
          onClick={setActiveBurgerToFalse}
          className="header__title"
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
        selectedKeys={menuSelectItems}
        className={cn('header__menu', activeBurger ? 'active' : '')}
        onClick={setActiveBurgerToFalse}
      >
        {mainMenu}
      </Menu>
    </Layout.Header>
  );
}

export default withRouter(Header);
