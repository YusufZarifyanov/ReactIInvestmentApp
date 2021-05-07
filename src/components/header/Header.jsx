import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  AppstoreFilled,
  QuestionCircleFilled,
  ShoppingFilled,
} from "@ant-design/icons";

function Header() {
  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
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
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["portfolio"]}
        style={{
          flex: "0 1 auto",
        }}
      >
        <Menu.Item key="portfolio" icon={<ShoppingFilled />}>
          Мой Портфель
        </Menu.Item>
        <Menu.Item key="showcase" icon={<AppstoreFilled />}>
          Витрина
        </Menu.Item>
        <Menu.Item key="about" icon={<QuestionCircleFilled />}>
          О программе
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default Header;
