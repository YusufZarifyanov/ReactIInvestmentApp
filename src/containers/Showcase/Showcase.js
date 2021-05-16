import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import {
  RiseOutlined,
  ScheduleOutlined,
  FireOutlined
} from "@ant-design/icons";


const sbMenuItems = [
  {
    name: "Топ Просмотров",
    route: '/showcase_route',
    icon: <FireOutlined />
  },
  {
    name: "Взлеты и Падения",
    route: '/showcase_route',
    icon: <RiseOutlined />
  },
  {
    name: "События",
    route: '/showcase_route',
    icon: <ScheduleOutlined />
  },
];

const Showcase = () => {
  return (
    <Layout>
      <SideBar typeCase={"showcase"} menuItems={sbMenuItems} />
      <ContentWindow data={"showcase"} className="content_block" />
    </Layout>
  );
};

export default Showcase;
