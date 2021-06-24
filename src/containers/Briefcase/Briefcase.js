import { Layout } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import { useRedirect } from "../../hooks/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { fetchSecurities } from "../../store/slices/securities";

import { changeCurrentSecurity } from "../../store/slices/securities";

const Briefcase = () => {
  const [securityState, setSecurityState] = useState({});
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);
  const { briefcaseSubmenuId } = useParams();

  const briefcase = {
    amount: 1000,
    someData: [],
  };

  // let securities = {
  //   currency: useSelector((state) => state.securities.myBriefcase.currency),
  //   bonds: useSelector((state) => state.securities.myBriefcase.bonds),
  //   shares: useSelector((state) => state.securities.myBriefcase.shares),
  //   funds: useSelector((state) => state.securities.myBriefcase.funds),
  // };

  // useEffect(() => {
  //   dispatch(changeCurrentSecurity(briefcaseSubmenuId));
  //   briefcaseSubmenuId === "review" &&
  //     dispatch(fetchSecurities(overviewTickers));
  //   briefcaseSubmenuId === "currency" &&
  //     dispatch(fetchSecurities(securities.currency.tickers));
  //   briefcaseSubmenuId === "bonds" &&
  //     dispatch(fetchSecurities(securities.bonds.tickers));
  //   briefcaseSubmenuId === "shares" &&
  //     dispatch(fetchSecurities(securities.shares.tickers));
  //   briefcaseSubmenuId === "funds" &&
  //     dispatch(fetchSecurities(securities.funds.tickers));
  // }, []);

  const currency = useSelector(
    (state) => state.securities.myBriefcase.currency
  );
  const bonds = useSelector((state) => state.securities.myBriefcase.bonds);
  const shares = useSelector((state) => state.securities.myBriefcase.shares);
  const funds = useSelector((state) => state.securities.myBriefcase.funds);

  const securities = { currency, bonds, shares, funds };

  let overviewTickers = [].concat([
    currency.tickers,
    shares.tickers,
    bonds.tickers,
    funds.tickers,
  ]);

  useEffect(() => {
    dispatch(changeCurrentSecurity(briefcaseSubmenuId));
    briefcaseSubmenuId === "review" &&
      dispatch(fetchSecurities(overviewTickers));
    briefcaseSubmenuId === "currency" &&
      dispatch(fetchSecurities(securities.currency.tickers));
    briefcaseSubmenuId === "bonds" &&
      dispatch(fetchSecurities(securities.bonds.tickers));
    briefcaseSubmenuId === "shares" &&
      dispatch(fetchSecurities(securities.shares.tickers));
    briefcaseSubmenuId === "funds" &&
      dispatch(fetchSecurities(securities.funds.tickers));
  }, [briefcaseSubmenuId]);

  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      {briefcaseSubmenuId === "review" ? (
        <Overview briefcaseCalculation={briefcase} data={securities}></Overview>
      ) : (
        // <Component briefcaseCalculation={briefcase} loading={loading} />
        <Securities data={securities[briefcaseSubmenuId].data}></Securities>
        // <Component />
      )}
    </Layout>
  );
};

export default Briefcase;
