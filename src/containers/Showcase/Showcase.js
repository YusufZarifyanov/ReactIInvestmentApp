import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { useParams } from "react-router";
import {
  FireOutlined,
  RiseOutlined,
  ScheduleOutlined
} from "@ant-design/icons";

const subMenuItems = [
  {
    name: "Топ Просмотров",
    path: '/showcase/topviews',
    icon: <FireOutlined />,
  },
  {
    name: "Взлеты и Падения",
    path: '/showcase/upsdowns',
    icon: <RiseOutlined />,
  },
  {
    name: "События",
    path: '/showcase/events',
    icon: <ScheduleOutlined />,
  },
];

const Showcase = () => {
  const { showcaseSubmenuId } = useParams();

  return (
    <Layout>
      <SideBar
        menuItems={subMenuItems}
        activeMenuItem={`/showcase/${showcaseSubmenuId}`}
    />
      <ContentWindow>
        this is super showcase
      </ContentWindow>
    </Layout>
  );
};

export default Showcase
