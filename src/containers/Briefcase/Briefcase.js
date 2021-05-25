import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import BriefcaseOverview from "../../components/BriefcaseOverview/BriefcaseOverview";
import BriefcaseItem from "../../components/BriefcaseItem/BriefcaseItem" 
import { useParams } from "react-router";
import {
  data_bonds,
  data_currency,
  data_fonds,
  data_shares,
} from "../../data/data_briefcase/index";
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
    path: "/briefcase/review",
    icon: <EyeOutlined />,
  },
  {
    name: "Валюта",
    path: "/briefcase/currency",
    icon: <DollarCircleOutlined />,
  },
  {
    name: "Акции",
    path: "/briefcase/shares",
    icon: <PercentageOutlined />,
  },
  {
    name: "Облигации",
    path: "/briefcase/bonds",
    icon: <FileTextOutlined />,
  },
  {
    name: "Фонды",
    path: "/briefcase/funds",
    icon: <BankOutlined />,
  },
];

const Briefcase = () => {
  const { briefcaseSubmenuId } = useParams();
  let data;
  switch (briefcaseSubmenuId) {
    case "currency":
      data = data_currency;
      break;
    case "shares":
      data = data_shares;
      break;
    case "bonds":
      data = data_bonds;
      break;
    case "funds":
      data = data_fonds;
      break;
    default:
      console.log("Нет таких значений");
  }
  console.log(data)
  return (
    <Layout>
      <SideBar
        menuItems={subMenuItems}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <BriefcaseOverview
          activeMenuItem={briefcaseSubmenuId}
          data={{ data_bonds, data_currency, data_fonds, data_shares }}
        />
      ) : (
        <BriefcaseItem data={data} />
      )}
    </Layout>
  );
};

export default Briefcase;
