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
      >
        <Menu.Item key="briefcase" icon={<ShoppingFilled />}>
          <Link to="briefcase">
            Мой Портфель
          </Link>
        </Menu.Item>
        <Menu.Item key="showcase" icon={<AppstoreFilled />}>
          <Link to="showcase">
            Витрина
          </Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<QuestionCircleFilled />}>
          <Link to="about">
            О программе
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default Header;
