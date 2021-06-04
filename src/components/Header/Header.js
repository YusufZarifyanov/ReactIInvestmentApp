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
import styles from './Header.module.scss'
import { securities } from "../../data/briefcase/securities";

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
      <Menu.Item className={styles.menuItem} key={item.path} icon={item.icon}>
        <Link to={item.path}>
          {item.name}
        </Link>
      </Menu.Item>
    )
  })

  const ticker = currentPath.split('/')[3]
  
  if (ticker) {
    securities[currentPath.split('/')[2]].data.find(item => item.tiker === ticker)
    ? menuSelectItems.push("/briefcase/review")
    : menuSelectItems.push("/showcase/topviews")
  }

  const [activeBurger, setActiveBurger] = useState(false)

  function handleActiveBurger() {
    setActiveBurger(!activeBurger)
  }

  function setActiveBurgerToFalse() {
    setActiveBurger(false)
  }

  return (
    <Layout.Header
      className={styles.header}
    >
      <Link to="/" className={styles.link}>
        <Typography.Title
          onClick={setActiveBurgerToFalse}
          className={styles.title}
        >
          IZI Investment
      </Typography.Title>
      </Link>
      <div
        className={styles.burgerBtn}
        onClick={handleActiveBurger} >
        {activeBurger ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="vertical"
        selectedKeys={menuSelectItems}
        className={cn(styles.menu, activeBurger ? styles.active : '')}
        onClick={setActiveBurgerToFalse}
      >
        {mainMenu}
      </Menu>
    </Layout.Header>
  );
}

export default withRouter(Header);