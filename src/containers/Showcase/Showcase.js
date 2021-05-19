import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { withRouter } from "react-router";
import {
  FireOutlined,
  RiseOutlined,
  ScheduleOutlined
} from "@ant-design/icons";

const menuItemsShowcase = [
  {
    path: '/showcase/topviews',
    icon: <FireOutlined />,
  },
  {
    path: '/showcase/upsdowns',
    icon: <RiseOutlined />,
  },
  {
    path: '/showcase/events',
    icon: <ScheduleOutlined />,
  },
];

const Showcase = ({location, routes}) => {
  const currentPath = location.pathname

  return (
    <Layout>
      <SideBar
      menuItems={menuItemsShowcase}
      routes={routes}
      active={currentPath}
    />
      <ContentWindow>
        this is super showcase
      </ContentWindow>
    </Layout>
  );
};

export default withRouter(Showcase);
