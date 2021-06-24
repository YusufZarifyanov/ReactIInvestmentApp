import { Layout, Modal } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSecurities,
  fetchAllSecurities,
  changeCurrentSecurity,
  resetWarning
} from "../../store/slices/securities";
import { useRedirect } from "../../hooks/useRedirect";

const Briefcase = () => {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(true);
  const { briefcaseSubmenuId } = useParams();

  const warning = useSelector(state => state.securities.warning);

  function closeModalWindow() {
    dispatch(resetWarning());
  }

  const briefcase = {
    amount: 1000,
    someData: [],
  };

  const currency = useSelector(
    (state) => state.securities.myBriefcase.currency
  );
  const bonds = useSelector((state) => state.securities.myBriefcase.bonds);
  const shares = useSelector((state) => state.securities.myBriefcase.shares);
  const funds = useSelector((state) => state.securities.myBriefcase.funds);

  const securities = { currency, bonds, shares, funds };

  useEffect(() => {
    dispatch(changeCurrentSecurity(briefcaseSubmenuId));
    briefcaseSubmenuId === "review" &&
      dispatch(
        fetchAllSecurities({
          currency: securities.currency.tickers,
          bonds: securities.bonds.tickers,
          shares: securities.shares.tickers,
          funds: securities.funds.tickers,
        })
      );
    briefcaseSubmenuId === "currency" &&
      dispatch(fetchSecurities(securities.currency.tickers));
    briefcaseSubmenuId === "bonds" &&
      dispatch(fetchSecurities(securities.bonds.tickers));
    briefcaseSubmenuId === "shares" &&
      dispatch(fetchSecurities(securities.shares.tickers));
    briefcaseSubmenuId === "funds" &&
      dispatch(fetchSecurities(securities.funds.tickers));
  }, []);

  const components = {
    review: {
      component: Overview,
      data: securities,
    },
    currency: {
      component: Securities,
      data: currency.data,
    },
    shares: {
      component: Securities,
      data: shares.data,
    },
    bonds: {
      component: Securities,
      data: bonds.data,
    },
    funds: {
      component: Securities,
      data: funds.data,
    },
  };

  const Component = useRedirect(
    components,
    "/briefcase/review",
    briefcaseSubmenuId,
    "review"
  );

  return (
    <>
      {warning && <Modal
        title="Warning"
        centered
        visible={warning}
        onOk={closeModalWindow}
        onCancel={closeModalWindow}
        destroyOnClose={true}
        cancelButtonProps={
          {
            disabled: true
          }
        }
      >
        <p>{warning}</p>
      </Modal>}
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
    </>
  );
};

export default Briefcase;
