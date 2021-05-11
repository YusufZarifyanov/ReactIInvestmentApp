import { Layout, Menu } from "antd";

const { Content, Sider } = Layout;
/*eslint-disable*/ 
import {Link} from "react-router-dom"

const SideBar= (props) => {
  return (
    <>
      <Sider>
        <Menu
          className="sidebar_block"
          mode="inline"
          defaultSelectedKeys={["4"]}
        >
          <Menu.Item key="1">
            <Link to={"/briefcase"}>{props.data[1]}</Link>
          </Menu.Item>
          <Menu.Item key="2">
            {" "}
            <Link to={"/briefcase"}>{props.data[2]}</Link>
          </Menu.Item>
          <Menu.Item key="3">
            {" "}
            <Link to={"/briefcase"}>{props.data[3]}</Link>
          </Menu.Item>
          <Menu.Item key="4">
            {" "}
            <Link to={"/briefcase"}>{props.data[0]}</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;
