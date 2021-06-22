import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import securities from "../../data/briefcase/securities";
import { useRedirect } from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { fetchOverview } from "../../store/slices/securities";

const Briefcase = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { briefcaseSubmenuId } = useParams();

  const briefcase = {
    amount: 1000,
    someData: [],
  };

  useEffect(async () => {
      dispatch(fetchOverview("BABA"));
  }, []);
  const currency = useSelector(state => state.securities.overview);
  const shares = useSelector(state => state.securities.overview);
  const bonds = useSelector(state => state.securities.overview);
  const funds = useSelector(state => state.securities.overview);
  const review = [].concat([currency, shares, bonds, funds]);
  const components = {
    review: {
      component: Overview,
      data: review,
    },
    currency: {
      component: Securities,
      data: currency,
    },
    shares: {
      component: Securities,
      data: shares,
    },
    bonds: {
      component: Securities,
      data: bonds,
    },
    funds: {
      component: Securities,
      data: funds,
    },
  }

  useEffect(() => {
    dispatch(fetchOverview("BABA"));
  }, [components, dispatch])

  const Component = useRedirect(
    components,
    "/briefcase/review",
    briefcaseSubmenuId,
    "review"
  );

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <Component briefcaseCalculation={briefcase} loading={loading} />
      ) : (
        <Component />
      )}
    </Layout>
  );
};

export default Briefcase;
