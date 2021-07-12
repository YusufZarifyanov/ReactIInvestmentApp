import { memo } from "react";
import styles from "./SecurityItemData.module.scss";

const SecurityItemData = ({ tickerData, ticker, securityType }) => {
  return (
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
        {securityType && <button className={styles.btn}>Продать</button>}
      </div>
    </div>
  );
};

export default memo(SecurityItemData);
