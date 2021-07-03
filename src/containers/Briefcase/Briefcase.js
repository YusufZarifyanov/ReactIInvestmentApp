import { Layout, Modal } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Overview from "../../components/Overview/Overview";
import Securities from "../../components/Securities/Securities";
import { useParams, useHistory } from "react-router";
import { useEffect, useState } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchSecurities, fetchGraph } from "../../store/slices/securities";
import { tickersData } from "../../utils/data";
import { resetWarning } from "../../store/slices/modals";

const Briefcase = () => {
  const dispatch = useDispatch();

  const { briefcaseSubmenuId } = useParams();

  const warning = useSelector((state) => state.modals.warning);

  function closeModalWindow() {
    dispatch(resetWarning());
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
    if (securities.length === 0) {
      dispatch(fetchSecurities(allTickers.join(",")));
    }
  }, [briefcaseSubmenuId]);

 
  return (
    <>
      {warning && (
        <Modal
          title="Warning"
          centered
          visible={warning}
          onOk={closeModalWindow}
          onCancel={closeModalWindow}
          destroyOnClose={true}
          cancelButtonProps={{
            disabled: true,
          }}
        >
          <p>{warning}</p>
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
