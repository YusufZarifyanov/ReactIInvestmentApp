import { Layout, Modal } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams, useHistory } from "react-router";
import { useEffect } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSecurities,
  resetRejectedInSecuritiesSlice,
} from "../../store/slices/securities";
import { tickersData } from "../../utils/data";
import { resetWarning } from "../../store/slices/modals";

const Briefcase = () => {
  const dispatch = useDispatch();

  const { briefcaseSubmenuId } = useParams();

  const warning = useSelector((state) => state.modals.warning);
  const rejectedInSecurities = useSelector(
    (state) => state.securities.rejected
  );

  function closeModalWindow() {
    warning && dispatch(resetWarning());
    rejectedInSecurities && dispatch(resetRejectedInSecuritiesSlice());
  }

  const history = useHistory();

  const briefcase = {
    amount: 1000,
    someData: [],
  };

  const allTickers = [].concat(
    tickersData.currency,
    tickersData.shares,
    tickersData.bonds,
    tickersData.funds
  );

  const securities = useSelector((state) => state.securities.myBriefcase.data);
  const securitiesKeys = Object.keys(tickersData);

  if (
    securitiesKeys.indexOf(briefcaseSubmenuId) === -1 &&
    briefcaseSubmenuId !== "review"
  )
    history.push("/briefcase/review");

  useEffect(() => {
    let promiseForCanceling;

    if (securities.length === 0) {
      promiseForCanceling = dispatch(fetchSecurities(allTickers.join(",")));
    }

    return () => {
      promiseForCanceling && promiseForCanceling.abort();
    };
  }, [briefcaseSubmenuId]);

  return (
    <>
      {(warning || rejectedInSecurities) && (
        <Modal
          title="Warning"
          centered
          visible={warning || rejectedInSecurities}
          onOk={closeModalWindow}
          onCancel={closeModalWindow}
          destroyOnClose={true}
          maskClosable={false}
          cancelButtonProps={{
            disabled: true,
          }}
        >
          <p>{warning || rejectedInSecurities}</p>
        </Modal>
      )}
      <Layout>
        <SideBar
          menuItems={subMenuBriefcase}
          activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
        />
        {briefcaseSubmenuId === "review" ||
        securitiesKeys.indexOf(briefcaseSubmenuId) === -1 ? (
          <Overview
            data={securities}
            briefcaseCalculation={briefcase}
          ></Overview>
        ) : (
          <Securities data={securities[briefcaseSubmenuId]}></Securities>
        )}
      </Layout>
    </>
  );
};

export default Briefcase;
