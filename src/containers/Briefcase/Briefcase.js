import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import BriefcaseOverview from "../../components/BriefcaseOverview/BriefcaseOverview";
import BriefcaseSecurity from "../../components/BriefcaseSecurity/BriefcaseSecurity";
import { useParams } from "react-router";

import { subMenuBriefcase } from "../../data/sub_menu";
import { securities } from "../../data/briefcase/securities";

const Briefcase = () => {
  const { briefcaseSubmenuId } = useParams();

  const hasParam = Object.keys(securities).find(
    (key) => key === "currency"
  );

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <BriefcaseOverview
          activeMenuItem={briefcaseSubmenuId}
          data={securities}
        />
      ) : (
        <BriefcaseSecurity data={securities[hasParam]} />
      )}
    </Layout>
  );
};

export default Briefcase;
