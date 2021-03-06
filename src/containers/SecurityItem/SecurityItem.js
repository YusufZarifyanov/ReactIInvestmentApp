import { useLocation, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { subMenuBriefcase, subMenuShowcase } from "../../data/sub_menu";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentSecurity,
  fetchGraph,
  resetRejectedInSecuritiesSlice,
  cleanCurrentSucurityInfo,
} from "../../store/slices/securities";
import { Spin } from "antd";
import styles from "./SecurityItem.module.scss";

import { Layout, Space, Button, Modal } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Graph from "../../components/SecuritiesGraphic/SecuritiesGraphic.js";
import { getPathPartByOrdinalNumber } from "../../utils/getPathPartByOrdinalNumber";
import { dateArray } from "../../utils/data";
import { resetWarning } from "../../store/slices/modals";
import SecurityItemData from "../../components/SecurityItemData/SecurityItemData";
import { cleanSecurityBtnLoading } from "../../utils/helperFunctions";

const SecurityItem = () => {
  const dispatch = useDispatch();
  const { securityType, activeSideBar, ticker } = useParams();
  const { pathname } = useLocation();
  const [graph, setGraph] = useState(false);

  const [graphSettings, setGraphSettings] = useState({
    name: "День",
    interval: "1m",
    range: "1d",
  });

  const [activeBtn, setActiveBtn] = useState({ index: 0 });

  let graphData = useSelector(
    (state) => state.securities.currentSecurity.graph
  );
  let tickerData = useSelector(
    (state) => state.securities.currentSecurity.meta
  );
  const loading = useSelector((state) => state.securities.loading);
  const warning = useSelector((state) => state.modals.warning);
  const rejectedInSecurities = useSelector(
    (state) => state.securities.rejected
  );

  cleanSecurityBtnLoading();
  dateArray[activeBtn.index].loading = loading;

  const handleChange = (action, name, interval, range, index) => {
    setActiveBtn({ index });
    if (action) {
      graph ? setGraph(false) : setGraph(true);
    } else if (name && interval && range) {
      setGraphSettings({
        name,
        interval,
        range,
      });
    } else {
      console.log("error in secirity graphic");
    }
  };

  function closeModalWindow() {
    warning && dispatch(resetWarning());
    rejectedInSecurities && dispatch(resetRejectedInSecuritiesSlice());
  }

  useEffect(() => {
    const promiseForCanceling = dispatch(
      fetchCurrentSecurity({
        tickers: `${ticker}`,
        queryParams: { ...graphSettings, ticker },
      })
    );

    return () => {
      promiseForCanceling && promiseForCanceling.abort();
      dispatch(cleanCurrentSucurityInfo());
    };
  }, []);

  useEffect(() => {
    let promiseForCanceling;
    if (Object.keys(tickerData).length) {
      promiseForCanceling = dispatch(fetchGraph({ ...graphSettings, ticker }));
    }

    return () => {
      promiseForCanceling && promiseForCanceling.abort();
    };
  }, [graphSettings]);

  // or we can do this:
  // useRef don't change between renders
  // componentDidMount (first running) -> didMount.current = false, so dispatch not runs; change didMount.current to true
  // componentDidUpdate (second and more runnings) -> didMount.current = true and dispatch runs

  // /////start/////
  // const didMount = useRef(false);

  // useEffect(() => {
  //   let promiseForCanceling;
  //   if (didMount.current) {
  //     promiseForCanceling = dispatch(fetchGraph({ ...graphSettings, ticker }));
  //   } else {
  //     didMount.current = true;
  //   }

  //   return () => {
  //     promiseForCanceling && promiseForCanceling.abort();
  //   };
  // }, [graphSettings]);
  // /////finish/////

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
        {
          <SideBar
            menuItems={
              getPathPartByOrdinalNumber(pathname, 1) === "briefcase"
                ? subMenuBriefcase
                : subMenuShowcase
            }
            activeMenuItem={`/${getPathPartByOrdinalNumber(
              pathname,
              1
            )}/${getPathPartByOrdinalNumber(pathname, 2)}`}
          />
        }
        <Layout.Content>
          {loading && Object.keys(tickerData).length === 0 ? (
            <Layout.Content>
              <div className={styles.spin}>
                <Spin size="large" />
              </div>
            </Layout.Content>
          ) : (
            <Layout.Content>
              <div className={styles.container}>
                <SecurityItemData
                  tickerData={tickerData}
                  ticker={ticker}
                  securityType={securityType}
                />
                <div className={styles.btnList}>
                  <Space size={[8, 16]} wrap>
                    {dateArray.map((el, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Button
                        key={index}
                        // disabled={loading}
                        loading={el.loading}
                        onClick={() =>
                          handleChange(
                            el.action,
                            el.name,
                            el.interval,
                            el.range,
                            index
                          )
                        }
                      >
                        {el.name}
                      </Button>
                    ))}
                  </Space>
                </div>
                {graphData && <Graph graphFlag={graph} graphData={graphData} />}
              </div>
            </Layout.Content>
          )}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default SecurityItem;
