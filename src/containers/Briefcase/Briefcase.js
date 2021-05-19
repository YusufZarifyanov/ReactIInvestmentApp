import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import ContentWindow from "../../components/ContentWindow/ContentWindow";
import { withRouter } from "react-router";
import {
  BankOutlined,
  DollarCircleOutlined,
  EyeOutlined,
  FileTextOutlined,
  PercentageOutlined
} from "@ant-design/icons";

const menuItemsBriefcase = [
  {
    path: '/briefcase/review',
    icon: <EyeOutlined />,
  },
  {
    path: '/briefcase/currency',
    icon: <DollarCircleOutlined />,
  },
  {
    path: '/briefcase/shares',
    icon: <PercentageOutlined />,
  },
  {
    path: '/briefcase/bonds',
    icon: <FileTextOutlined />,
  },
  {
    path: '/briefcase/funds',
    icon: <BankOutlined />,
  },
];

const Briefcase = ({routes, location}) => {
  const currentPath = location.pathname

  return (
    <Layout>
      <SideBar
      menuItems={menuItemsBriefcase}
      routes={routes}
      active={currentPath}
    />
      <ContentWindow>this is a cool briefcase!</ContentWindow>
    </Layout>
  );
};

export default withRouter(Briefcase);
