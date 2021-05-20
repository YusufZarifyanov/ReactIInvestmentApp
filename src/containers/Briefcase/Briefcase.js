import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { useParams } from "react-router";
import {
  BankOutlined,
  DollarCircleOutlined,
  EyeOutlined,
  FileTextOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

const subMenuItems = [
  {
    name: "Обзор",
    path: '/briefcase/review',
    icon: <EyeOutlined />,
  },
  {
    name: "Валюта",
    path: '/briefcase/currency',
    icon: <DollarCircleOutlined />,
  },
  {
    name: "Акции",
    path: '/briefcase/shares',
    icon: <PercentageOutlined />,
  },
  {
    name: "Облигации",
    path: '/briefcase/bonds',
    icon: <FileTextOutlined />,
  },
  {
    name: "Фонды",
    path: '/briefcase/funds',
    icon: <BankOutlined />,
  },
];

const Briefcase = () => {
  const { briefcaseSubmenuId } = useParams();

  return (
    <Layout>
      <SideBar
        menuItems={subMenuItems}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      <ContentWindow>this is a cool briefcase!</ContentWindow>
    </Layout>
  );
};

export default Briefcase;
