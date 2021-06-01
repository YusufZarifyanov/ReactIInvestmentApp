import { useParams } from "react-router-dom";
import { useState } from "react";
import { subMenuBriefcase } from "../../data/sub_menu";
import { securities } from "../../data/briefcase/securities";

import "antd/dist/antd.css";
import styles from "./BriefcaseItem.module.scss";

import { Layout } from "antd";
import SideBar from "../SideBar/SideBar";
import Graph from "../SecuritiesGraphic/SecuritiesGraphic.js";

const BriefcaseItem = ({ location }) => {
  const { securityType, tiker } = useParams();
  const [graph, setGraph] = useState(false);
  let dataElem;

  if (location.dataItem) dataElem = location.dataItem;
  else {
    let hasParam = Object.keys(securities).find((key) => key === securityType);
    if (!hasParam) console.log("Все плохо!");
    else {
      let flag = false;
      for (let el of securities[hasParam]) {
        if (el.tiker === tiker && !flag) {
          dataElem = el;
          flag = true;
          break;
        }
      }
      if (!flag) console.log("Опять все плохо!");
    }
  }

  console.log(dataElem);

  const handleChangeGraph = () => {
    graph ? setGraph(false) : setGraph(true);
  };
  return (
    <Layout>
      <SideBar
        menuItems={subMenuBriefcase}
        activeMenuItem={`/briefcase/${securityType}`}
      />
      <Layout.Content>
        <div className={styles.container}>
          <div className={styles.cards}>
            <div className={styles.securitiesType}>
              <div className={styles.info}>
                <div className={styles.infoName}>
                  <p className={styles.name}>{dataElem.name}</p>
                  <p className={styles.ticket}>ticket</p>
                </div>
                <div className={styles.infoDescription}>
                  <div className={styles.value}>
                    <p style={{ fontSize: "14px" }}>Доходность к погашению:</p>
                    <p style={{ fontSize: "18px", fontWeight: "600" }}>
                      {dataElem.value}%
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
                src={dataElem.src}
                className={styles.img}
              ></img>
            </div>
            <div className={styles.securitiesPrice}>
              <p className={styles.date}>Цена акции 27 мая 2021г.</p>
              <p className={styles.price}>
                {`${dataElem.currency} ${dataElem.cost}`}
              </p>
              <button className={styles.btn}>Приобрести</button>
            </div>
          </div>
          <button onClick={handleChangeGraph} className={styles.btnChangeGraph}>
            <i class="fa fa-arrows-v" aria-hidden="true"></i>
          </button>
          <Graph graphFlag={graph} />
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default BriefcaseItem;
