import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subMenuBriefcase, subMenuShowcase } from "../../data/sub_menu";
import securities from "../../data/briefcase/securities";
// import chartData from "../../data/briefcase/ChartData"
import { upsDowns } from "../../data/showcase/ups_downs";
import { topViews } from "../../data/showcase/top_views";

import styles from "./SecurityItem.module.scss";

import { Layout, Space, Button } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Graph from "../../components/SecuritiesGraphic/SecuritiesGraphic.js";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";


const SecurityItem = () => {
  const { securityType, activeSideBar, ticker } = useParams();
  const { pathname } = useLocation();

  const [graph, setGraph] = useState(false);
  const [xRange, setXRange] = useState([
    "2021-05-30 15:9:19",
    "2021-06-06 15:9:19",
  ]);
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    const API_KEY = "VAUVU4KVB5DXM9ED";
    const API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAL&outputsize=full&apikey=${API_KEY}`;

    fetch(API_Call)
      .then((res) => res.json())
      .then((json) => {
        json = json["Time Series (Daily)"]
        const yAxes = { open: [], high: [], low: [], close: [], adjusted: [] };
        const xAxes = Object.keys(json);
        for (let item of Object.keys(json)) {
          yAxes.open.push(json[item]["1. open"]);
          yAxes.high.push(json[item]["2. high"]);
          yAxes.low.push(json[item]["3. low"]);
          yAxes.close.push(json[item]["4. close"]);
          yAxes.adjusted.push(json[item]["5. adjusted close"]);
        }
        setChartData({ xAxes, yAxes });
      });
  }, []);

  let dataElem;

  function findTargetTicker(array) {
    let flag = false;
    for (let el of array) {
      if (el.ticker === ticker && !flag) {
        dataElem = el;
        flag = true;
        break;
      }
    }
  }

  let hasParam;

  function makeOneDimensionArrayFromObject(obj) {
    return Object.values(obj).reduce((acc, val) => acc.concat(val.data), []);
  }

  if (securityType) {

    if (securityType === "review") {
      hasParam = makeOneDimensionArrayFromObject(securities)
      findTargetTicker(hasParam);
    } else {
      hasParam = Object.keys(securities).find((key) => key === securityType);
      findTargetTicker(securities[hasParam].data);
    }

  } else if (activeSideBar) {
    activeSideBar === "topviews"
      ? hasParam = makeOneDimensionArrayFromObject(topViews)
      : hasParam = makeOneDimensionArrayFromObject(upsDowns)

    findTargetTicker(hasParam)
  }

  const handleChange = (action, dateDifference) => {
    if (action === "changeGraph") {
      graph ? setGraph(false) : setGraph(true);
    } else if (dateDifference) {
      const dateNow = new Date();

      const endDate =
        new Date().toISOString().slice(0, 10) +
        " " +
        dateNow.getHours() +
        ":" +
        dateNow.getMinutes() +
        ":" +
        dateNow.getSeconds();

      dateNow.setDate(dateNow.getDate() - dateDifference);

      const startDate =
        dateNow.toISOString().slice(0, 10) +
        " " +
        dateNow.getHours() +
        ":" +
        dateNow.getMinutes() +
        ":" +
        dateNow.getSeconds();

      setXRange([startDate, endDate]);
    }
  };

  const dateMas = [
    {
      name: "День",
      action: "Day",
      dataDifference: 1,
    },
    {
      name: "Неделя",
      action: "Week",
      dataDifference: 7,
    },
    {
      name: "Месяц",
      action: "Month",
      dataDifference: 30,
    },
    {
      name: "Полгода",
      action: "HalfYear",
      dataDifference: 180,
    },
    {
      name: "Год",
      action: "Year",
      dataDifference: 360,
    },
    {
      name: <i className="fa fa-arrows-v" aria-hidden="true"></i>,
      action: "changeGraph",
    },
  ];

  console.log(chartData);

  return (
    <Layout>
      {
        <SideBar
          menuItems={
            getPathPartByOrdinalNumber(pathname, 1) === "briefcase"
              ? subMenuBriefcase : subMenuShowcase
          }
          activeMenuItem={`/${getPathPartByOrdinalNumber(pathname, 1)}/${getPathPartByOrdinalNumber(pathname, 2)}`}
        />
      }
      <Layout.Content>
        <div className={styles.container}>
          <div className={styles.cards}>
            <div className={styles.securitiesType}>
              <div className={styles.info}>
                <div className={styles.infoName}>
                  <p className={styles.name}>{dataElem?.name}</p>
                  <p className={styles.ticket}>{dataElem?.ticker}</p>
                </div>
                <div className={styles.infoDescription}>
                  <div className={styles.value}>
                    <p style={{ fontSize: "14px" }}>Доходность к погашению:</p>
                    <p style={{ fontSize: "18px", fontWeight: "600" }}>
                      {dataElem?.value}%
                    </p>
                  </div>

                  <div className={styles.description}>
                    <p style={{ fontSize: "14px" }}>Рейтинг:</p>
                    <p style={{ fontSize: "18px", fontWeight: "600" }}>
                      Низкий
                    </p>
                  </div>
                </div>
              </div>
              <img
                alt="example"
                src={dataElem?.logo}
                className={styles.img}
              ></img>
            </div>
            <div className={styles.securitiesPrice}>
              <p className={styles.date}>Цена акции 27 мая 2021г.</p>
              <p className={styles.price}>
                {`${dataElem?.currency} ${dataElem?.cost}`}
              </p>

              <button className={styles.btn}>
                {
                  securityType ? "Купить еще" : "Приобрести"
                }
              </button>
              {
                securityType && <button className={styles.btn}>Продать</button>
              }
            </div>
          </div>
          <div className={styles.btnList}>
            <Space size={[8, 16]} wrap>
              {dateMas.map((el, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Button
                  key={index}
                  onClick={() => handleChange(el.action, el.dataDifference)}
                >
                  {el.name}
                </Button>
              ))}
            </Space>
          </div>
          {chartData && (
            <Graph graphFlag={graph} xRange={xRange} chartData={chartData} />
          )}
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default SecurityItem;
