import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar = (props) => {
  return (
    <>
      <Sider>
        <Menu
          className="sidebar_block"
          mode="inline"
          defaultSelectedKeys={["4"]}
        >
          {props.data.map((el, id) => (
            <Menu.Item key={id + 1}>
              <Link to={`/data`}>{el}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;
