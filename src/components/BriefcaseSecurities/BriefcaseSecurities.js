import React, { useState, useEffect } from "react";
import styles from "./BriefcaseSecurities.module.scss";
import { Layout } from "antd";
import SideBar from "../SideBar/SideBar";
import { subMenuItems } from "../../data/index";
// import SecuritiesGraphic from "../SecuritiesGraphic/SecuritiesGraphic.jsx";

const BriefcaseSecurities = ({ location }) => {
  const dataElem = location.dataItem;
  return (
    <Layout>
      <SideBar
        menuItems={subMenuItems}
        // activeMenuItem={`/briefcase/${briefcaseSubmenuId}`}
      />
      <Layout.Content>
        <div className={styles.container}>
          <div className={styles.info}>
            <div className={styles.securitiesType}>
              <p className={styles.name}>{dataElem.name}</p>
              <p
                className={styles.value}
              >{`Доходность за полгода ${dataElem.value}`}</p>
              <p className={styles.description}>{`Я свободный текст! Заполни меня`}</p>
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

          <div className={styles.graphic}>
            {/* <SecuritiesGraphic /> */}
          </div>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default BriefcaseSecurities;
