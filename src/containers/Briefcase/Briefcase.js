import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import BriefcaseOverview from "../../components/BriefcaseOverview/BriefcaseOverview";
import BriefcaseSecurity from "../../components/BriefcaseSecurity/BriefcaseSecurity"
import { useParams } from "react-router";

import { subMenuBriefcase } from "../../data/sub_menu"
import {data_bonds} from "../../data/briefcase/bounds"
import {data_currency} from "../../data/briefcase/currency"
import {data_fonds} from "../../data/briefcase/fonds"
import {data_shares} from "../../data/briefcase/shares"


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
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <BriefcaseOverview
          activeMenuItem={briefcaseSubmenuId}
          data={{ data_bonds, data_currency, data_fonds, data_shares }}
        />
      ) : (
        <BriefcaseSecurity data={data} />
      )}
    </Layout>
  );
};

export default Briefcase;
