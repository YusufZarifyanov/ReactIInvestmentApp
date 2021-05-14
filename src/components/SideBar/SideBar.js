import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar = ({ menuItems, typeCase }) => {

  return (
    <Sider>
      <Menu
        className="sidebar_block"
        mode="inline"
        defaultSelectedKeys={["4"]}
      >
        {menuItems.map((el, id) => (
          <Menu.Item key={id + 1}>
            <Link to={`/${typeCase}` + el.route}>{el.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
