import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";

const sbMenuItems = [
  {
    name: "Топ Просмотров",
    route: '/showcase_route'
  },
  {
    name: "Взлеты и Падения",
    route: '/showcase_route'
  },
  {
    name: "События",
    route: '/showcase_route'
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
