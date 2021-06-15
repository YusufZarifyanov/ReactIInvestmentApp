import React, { useState } from "react";
import {
  Layout,
  Typography,
} from "antd";
import {
  AppstoreFilled,
  CloseOutlined,
  MenuOutlined,
  QuestionCircleFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import cn from 'classnames'
import styles from './Header.module.scss'

const menuItems = [
  {
    name: "Мой Портфель",
    path: "/briefcase/",
    icon: <ShoppingFilled />,
  },
  {
    name: "Витрина",
    path: "/showcase/",
    icon: <AppstoreFilled />,
  },
  {
    name: "О программе",
    path: "/about",
    icon: <QuestionCircleFilled />,
  },
];

const Header = () => {
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
      <NavLink to="/" className={styles.link}>
        <Typography.Title
          onClick={setActiveBurgerToFalse}
          className={styles.title}
        >
          IZI Investment
        </Typography.Title>
      </NavLink>
      <div
        className={styles.burgerBtn}
        onClick={handleActiveBurger} >
        {activeBurger ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <nav
        className={cn(styles.menu, activeBurger ? styles.active : '')}
        onClick={setActiveBurgerToFalse}
      >
        {
          menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={styles.menuItem}
              activeClassName={styles.selected}
            >
              <span>
                {item.icon}
              </span>
              {item.name}
            </NavLink>
          )
          )
        }
      </nav>
    </Layout.Header>
  );
}

export default Header;