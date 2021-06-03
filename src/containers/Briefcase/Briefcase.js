import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import BriefcaseOverview from "../../components/BriefcaseOverview/BriefcaseOverview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";

import { subMenuBriefcase } from "../../data/sub_menu";
import { securities } from "../../data/briefcase/securities";

const Briefcase = () => {
  const { briefcaseSubmenuId } = useParams();

  const hasParam = Object.keys(securities).find(
    (key) => key === briefcaseSubmenuId
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
        <Securities
          data={securities[hasParam]}
          securityType={briefcaseSubmenuId}
        />
      )}
    </Layout>
  );
};

export default Briefcase;
