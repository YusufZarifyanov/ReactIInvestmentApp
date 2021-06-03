import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";

import { subMenuBriefcase } from "../../data/sub_menu";
import { securities } from "../../data/briefcase/securities";

const Briefcase = () => {
  const { briefcaseSubmenuId } = useParams();

  const hasParam = Object.keys(securities).find(
    (key) => key === briefcaseSubmenuId
  );

  const briefcase = {
    amount: 1000,
    someData: []
  }

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <Overview data={securities} briefcaseCalculation={briefcase} />
      ) : (
        <Securities
          data={securities[hasParam]?.data}
          securityType={briefcaseSubmenuId}
        />
      )}
    </Layout>
  );
};

export default Briefcase;
