import { Layout, Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { data_showcase, data_briefcase } from "../state"

const { Sider } = Layout;

const SideBar = (props) => {
  const [data, setData] = useState(props.typeCase === 'briefcase' ? data_briefcase : data_showcase);

  return (
    <>
      <Sider>
        <Menu
          className="sidebar_block"
          mode="inline"
          defaultSelectedKeys={["4"]}
        >
          {data.map((el, id) => (
            <Menu.Item key={id + 1}>
              <Link to={`/${props.typeCase}` + el.route}>{el.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    </>
  );
};

export default SideBar;
