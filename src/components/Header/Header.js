import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  AppstoreFilled,
  QuestionCircleFilled,
  ShoppingFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <Typography.Title
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
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["briefcase"]}
        style={{
          flex: "0 1 auto",
        }}
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
