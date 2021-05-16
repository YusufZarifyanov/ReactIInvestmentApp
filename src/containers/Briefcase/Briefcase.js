import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import {
  DollarCircleOutlined,
  EyeOutlined,
  PercentageOutlined,
  FileTextOutlined,
  BankOutlined,
} from "@ant-design/icons";

const sbMenuItems = [
  {
    name: "Обзор",
    route: '/briefcase_route',
    icon: <EyeOutlined />
  },
  {
    name: "Валюта",
    route: '/briefcase_route',
    icon: <DollarCircleOutlined />
  },
  {
    name: "Акции",
    route: '/briefcase_route',
    icon: <PercentageOutlined />
  },
  {
    name: "Облигации",
    route: '/briefcase_route',
    icon: <FileTextOutlined />
  },
  {
    name: "Фонды",
    route: '/briefcase_route',
    icon: <BankOutlined />
  },
];

const Briefcase = () => {
  return (
    <Layout>
      <SideBar typeCase={"briefcase"} menuItems={sbMenuItems} />
      <ContentWindow data={"briefcase"} className="content_block" />
    </Layout>
  );
};

export default Briefcase;
