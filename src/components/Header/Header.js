import React, { useState } from "react";
import { Layout, Menu, Typography } from "antd";
import {
  AppstoreFilled,
  CloseOutlined,
  MenuOutlined,
  QuestionCircleFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import cn from 'classnames'
import './Header.css'

const menuItems = [{
  id: 1,
  key: "briefcase",
  icon: <ShoppingFilled />,
  text: 'Мой Портфель'
},
{
  id: 2,
  key: "showcase",
  icon: <AppstoreFilled />,
  text: 'Витрина'
},
{
  id: 3,
  key: "about",
  icon: <QuestionCircleFilled />,
  text: 'О программе'
}]

function Header() {
  const [active, setActive] = useState(false)

  function handleActive() {
    setActive(!active)
  }

  function setActiveToFalse() {
    setActive(false)
  }

  return (
    <Layout.Header
      className='header'
    >
      <Link to="/">
        <Typography.Title onClick={setActiveToFalse}
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
        onClick={handleActive}
      >
        {active ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <Menu
        theme="dark"
        mode="vertical"
        defaultSelectedKeys={["briefcase"]}
        className={cn('header__menu', active ? 'active' : '')}
        onClick={setActiveToFalse}
      >{menuItems.map(item => (
        <Menu.Item className="header__menuItem" key={item.key} icon={item.icon}>
          <Link to={item.key}>
            {item.text}
          </Link>
        </Menu.Item>
      ))}
      </Menu>
    </Layout.Header>
  );
}

export default Header;
