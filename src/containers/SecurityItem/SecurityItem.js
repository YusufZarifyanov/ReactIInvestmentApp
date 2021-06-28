import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subMenuBriefcase, subMenuShowcase } from "../../data/sub_menu";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchGraphData, fetchSecurities } from "../../store/slices/securities";
import styles from "./SecurityItem.module.scss";

import { Layout, Space, Button } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Graph from "../../components/SecuritiesGraphic/SecuritiesGraphic.js";
import { getPathPartByOrdinalNumber } from "../../utils/getPathPartByOrdinalNumber";
import { convertTimestamp } from "../../utils";
import { dateArray } from "../../utils/data";

const SecurityItem = () => {
  const dispatch = useDispatch();
  const { securityType, activeSideBar, ticker } = useParams();
  const { pathname } = useLocation();

  const [graph, setGraph] = useState(false);

  // const [tickerData, setTickerData] = useState({});
  const [graphSettings, setGraphSettings] = useState({
    name: "День",
    interval: "1m",
    range: "1d",
  });

  const [loading, setLoading] = useState([true]);
  const [activeBtn, setActiveBtn] = useState({ index: 0 });

  let graphData = useSelector((state) => state.securities.graph);
  let tickerData = graphData.meta;
  console.group(graphData);
  console.log(tickerData);
  useEffect(() => {
    dispatch(fetchGraphData({ ...graphSettings, ticker }));
    dispatch(fetchSecurities([ticker]));
  }, []);

  const handleChange = (action, name, interval, range, index) => {
    const newLoadings = [...loading];
    newLoadings[index] = true;
    setLoading(newLoadings);
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

  return (
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
                src={`https://s3.polygon.io/logos/${ticker.toLowerCase()}/logo.png`}
                className={styles.img}
              ></img>
            </div>
            <div className={styles.securitiesPrice}>
              <p className={styles.date}>Цена акции 27 мая 2021г.</p>
              <p className={styles.price}>{`${tickerData?.ask} $`}</p>

              <button className={styles.btn}>
                {securityType ? "Купить еще" : "Приобрести"}
              </button>
              {securityType && <button className={styles.btn}>Продать</button>}
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
    </Layout>
  );
};

export default SecurityItem;
