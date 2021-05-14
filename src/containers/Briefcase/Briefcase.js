import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";

const sbMenuItems = [
  {
    name: "Обзор",
    route: '/briefcase_route'
  },
  {
    name: "Валюта",
    route: '/briefcase_route'
  },
  {
    name: "Акции",
    route: '/briefcase_route',
  },
  {
    name: "Облигации",
    route: '/briefcase_route'
  },
  {
    name: "Фонды",
    route: '/briefcase_route'
  },
];

const Briefcase = (props) => {
  return (
    <Layout>
      <SideBar typeCase={"showcase"} menuItems={sbMenuItems} />
      <ContentWindow data={"briefcase"} className="content_block" />
    </Layout>
  );
};

export default Briefcase;
