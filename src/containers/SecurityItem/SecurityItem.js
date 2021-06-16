import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subMenuBriefcase, subMenuShowcase } from "../../data/sub_menu";

import styles from "./SecurityItem.module.scss";

import { Layout, Space, Button } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Graph from "../../components/SecuritiesGraphic/SecuritiesGraphic.js";
import { getPathPartByOrdinalNumber } from "../../functions/getPathPartByOrdinalNumber";

function convertTimestamp(timestamp) {
  let d = new Date(timestamp * 1000), 
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), 
    dd = ("0" + d.getDate()).slice(-2), 
    h = d.getHours(),
    min = ("0" + d.getMinutes()).slice(-2), 
    sec = ("0" + d.getSeconds()).slice(-2),
    ampm = "AM",
    time;

  time = yyyy + "-" + mm + "-" + dd + " " + h + ":" + min + ":" + sec;
  return time;
}

const dateMas = [
  {
    name: "День",
    interval: "1m",
    range: "1d",
  },
  {
    name: "Неделя",
    interval: "15m",
    range: "5d",
  },
  {
    name: "Месяц",
    interval: "60m",
    range: "1mo",
  },
  {
    name: "Полгода",
    interval: "1d",
    range: "6mo",
  },
  {
    name: "Год",
    interval: "1d",
    range: "1y",
  },
  {
    name: <i className="fa fa-arrows-v" aria-hidden="true"></i>,
    action: "changeGraph",
  },
];


const SecurityItem = () => {
  const { securityType, activeSideBar, ticker } = useParams();
  const { pathname } = useLocation();

  const [graph, setGraph] = useState(false);

  const [tickerData, setTickerData] = useState({});
  const [graphSettings, setGraphSettings] = useState({
    name: "День",
    interval: "1m",
    range: "1d",
  });
  const [graphData, setGraphData] = useState(undefined);

  useEffect(() => {
    console.log(graphSettings)
    fetch(
      `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-chart?interval=${graphSettings.interval}&symbol=${ticker}&range=${graphSettings.range}`,
      {
        headers: {
          "x-rapidapi-key":
            "ac7b597b45mshb7a6a40f5c1ead9p131c54jsn7802703f73cf",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
          useQueryString: true,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => json.chart.result[0])
      .then((data) => {
        setGraphData({
          xRange: data["timestamp"].map((el) => convertTimestamp(el)),
          close: data["indicators"]["quote"][0]["close"],
          open: data["indicators"]["quote"][0]["open"],
          high: data["indicators"]["quote"][0]["high"],
          low: data["indicators"]["quote"][0]["low"],
          volume: data["indicators"]["quote"][0]["volume"],
        });
      })
      .catch((err) => console.log(err));

    fetch(
      `https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=${ticker}`,
      {
        headers: {
          "x-rapidapi-key":
            "ac7b597b45mshb7a6a40f5c1ead9p131c54jsn7802703f73cf",
          "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
          useQueryString: true,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setTickerData(json.quoteResponse.result[0]))
      .catch((err) => console.log(err));
  }, [graphSettings]);

  const handleChange = (action, name, interval, range) => {
    console.log(action, name, interval, range)
    if (action) {
      graph ? setGraph(false) : setGraph(true);
    } else if (name && interval && range) {
      console.log(1)
      setGraphSettings({
        name,
        interval,
        range,
      });
    } else {
      console.log("error in secirity graphic");
    }
  };
  console.log(graphSettings);
  console.log(tickerData);
  console.log(graphData);

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
                  <p className={styles.name}>{tickerData?.shortName}</p>
                  <p className={styles.ticket}>{tickerData?.symbol}</p>
                </div>
                <div className={styles.infoDescription}>
                  <div className={styles.postMarketPrice}>
                    <p style={{ fontSize: "14px" }}>Доходность к погашению:</p>
                    <p style={{ fontSize: "18px", fontWeight: "600" }}>
                      {tickerData?.postMarketPrice}%
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
                src={tickerData?.logo}
                className={styles.img}
              ></img>
            </div>
            <div className={styles.securitiesPrice}>
              <p className={styles.date}>Цена акции 27 мая 2021г.</p>
              <p className={styles.price}>
                {`${tickerData?.postMarketPrice} ${tickerData?.postMarketPrice}`}
              </p>

              <button className={styles.btn}>
                {securityType ? "Купить еще" : "Приобрести"}
              </button>
              {securityType && <button className={styles.btn}>Продать</button>}
            </div>
          </div>
          <div className={styles.btnList}>
            <Space size={[8, 16]} wrap>
              {dateMas.map((el, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Button
                  key={index}
                  onClick={() =>
                    handleChange(el.action, el.name, el.interval, el.range)
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
