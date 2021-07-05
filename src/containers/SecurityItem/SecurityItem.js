import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subMenuBriefcase, subMenuShowcase } from "../../data/sub_menu";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraph, fetchSecurities, resetRejectedInSecuritiesSlice } from "../../store/slices/securities";
import { Spin } from "antd";
import styles from "./SecurityItem.module.scss";

import { Layout, Space, Button, Modal } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Graph from "../../components/SecuritiesGraphic/SecuritiesGraphic.js";
import { getPathPartByOrdinalNumber } from "../../utils/getPathPartByOrdinalNumber";
import { dateArray, tickersData } from "../../utils/data";
import { resetWarning } from "../../store/slices/modals";

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
  let loading = [false, false, false, false, false, false];
  
  let graphData = useSelector(
    (state) => state.securities.currentSecurity.graph
  );
  let tickerData = useSelector(
    (state) => state.securities.currentSecurity.meta
  );
  const graphLoading = useSelector(
    (state) => state.securities.currentSecurity.loading
  );
  const securityLoading = useSelector(
    (state) => state.securities.myBriefcase.loading
  );
  const warning = useSelector((state) => state.modals.warning);
  const rejectedInSecurities = useSelector(
    (state) => state.securities.rejected
  );
  console.log(loading)
  useEffect(() => {
    dispatch(fetchGraph({ ...graphSettings, ticker }));
  }, [graphSettings, graph]);

  useEffect(() => {
    dispatch(fetchSecurities(`${ticker}`));
  }, []);

  useEffect(() => {
    dispatch(fetchGraph({ ...graphSettings, ticker }));
  }, [graph, graphSettings]);

  console.log(graphLoading)
  console.log(activeBtn.index)
  loading[activeBtn.index] = graphLoading;

  const handleChange = (action, name, interval, range, index) => {
    loading[index] = !graphLoading
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
        {securityLoading ? (
          <Layout.Content>
            <div className={styles.spin}>
              <Spin size="large" />
            </div>
          </Layout.Content>
        ) : (
          <Layout.Content>
            <div className={styles.container}>
              <div className={styles.cards}>
                <div className={styles.securitiesType}>
                  <div className={styles.info}>
                    <div className={styles.infoName}>
                      <p>{tickerData?.shortName}</p>
                      <p style={{ marginLeft: "1rem", fontSize: "10px" }}>
                        {tickerData?.symbol}
                      </p>
                    </div>
                    <div className={styles.infoDescription}>
                      <div>
                        <p>Доходность к погашению:</p>
                        <p>{tickerData?.bidSize}%</p>
                      </div>

                      <div style={{ marginLeft: "2rem" }}>
                        <p>Рейтинг:</p>
                        <p>Низкий</p>
                      </div>
                    </div>
                  </div>
                  <img
                    alt="example"
                    src={`${
                      process.env.REACT_APP_POLYGON_FOR_LOGO
                    }${ticker.toLowerCase()}/logo.png`}
                    className={styles.img}
                  ></img>
                </div>
                <div className={styles.securitiesPrice}>
                  <p className={styles.date}>Цена акции 27 мая 2021г.</p>
                  <p className={styles.price}>{`${tickerData?.ask} $`}</p>

                  <button className={styles.btn}>
                    {securityType ? "Купить еще" : "Приобрести"}
                  </button>
                  {securityType && (
                    <button className={styles.btn}>Продать</button>
                  )}
                </div>
              </div>
              <div className={styles.btnList}>
                <Space size={[8, 16]} wrap>
                  {dateArray.map((el, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Button
                      key={index}
                      loading={loading[index]}
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
