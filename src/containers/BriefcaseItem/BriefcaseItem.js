import { useParams } from "react-router-dom";
import { useState } from "react";
import { subMenuBriefcase, subMenuShowcase } from "../../data/sub_menu";
import { securities } from "../../data/briefcase/securities";

import styles from "./BriefcaseItem.module.scss";

import { Layout, Space, Button } from "antd";
import SideBar from "../../components/SideBar/SideBar";
import Graph from "../../components/SecuritiesGraphic/SecuritiesGraphic.js";

const BriefcaseItem = () => {
  const { securityType, tiker } = useParams();
  const [graph, setGraph] = useState(false);
  const [xRange, setXRange] = useState(["2017-01-04", "2017-02-15"]);
  let dataElem;

  let hasParam = Object.keys(securities).find((key) => key === securityType);
  if (!hasParam) {
    console.log("Все плохо!");
  } else {
    let flag = false;
    for (let el of securities[hasParam].data) {
      if (el.tiker === tiker && !flag) {
        dataElem = el;
        flag = true;
        break;
      }
    }
    if (!flag) {
      console.log("Опять все плохо!");
    }
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
      name: <i class="fa fa-arrows-v" aria-hidden="true"></i>,
      action: "changeGraph",
    },
  ];

  return (
    <Layout>
      {
        securities[securityType].data.find(item => item.tiker === tiker)
          ? <SideBar
            menuItems={subMenuBriefcase}
            activeMenuItem={`/briefcase/${securityType}`}
          />
          : <SideBar
            menuItems={subMenuShowcase}
            activeMenuItem="/showcase/topviews"
          />
      }
      <Layout.Content>
        <div className={styles.container}>
          <div className={styles.cards}>
            <div className={styles.securitiesType}>
              <div className={styles.info}>
                <div className={styles.infoName}>
                  <p className={styles.name}>{dataElem?.name}</p>
                  <p className={styles.ticket}>ticket</p>
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
                src={dataElem?.src}
                className={styles.img}
              ></img>
            </div>
            <div className={styles.securitiesPrice}>
              <p className={styles.date}>Цена акции 27 мая 2021г.</p>
              <p className={styles.price}>
                {`${dataElem?.currency} ${dataElem?.cost}`}
              </p>
              <button className={styles.btn}>Приобрести</button>
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
          <Graph graphFlag={graph} xRange={xRange} />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default BriefcaseItem;
