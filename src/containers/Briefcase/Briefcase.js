import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";

import { subMenuBriefcase } from "../../data/sub_menu";
import { securities } from "../../data/briefcase/securities";
import { useRedirect } from "../../hooks/useRedirect";

const components = {
  review: {
    component: Overview,
    data: securities,
  },
  currency: {
    component: Securities,
    data: securities.currency.data,
  },
  shares: {
    component: Securities,
    data: securities.shares.data,
  },
  bonds: {
    component: Securities,
    data: securities.bonds.data,
  },
  funds: {
    component: Securities,
    data: securities.funds.data,
  },
}

const Briefcase = () => {
  const { briefcaseSubmenuId } = useParams();

  const briefcase = {
    amount: 1000,
    someData: []
  }

  const Component = useRedirect(
    components,
    "/briefcase/review",
    briefcaseSubmenuId,
    "review"
  )

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <Component briefcaseCalculation={briefcase} />
      ) : (
        <Component />
      )}
    </Layout>
  );
};

export default Briefcase;
