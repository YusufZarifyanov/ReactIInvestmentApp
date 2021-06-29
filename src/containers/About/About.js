import { Divider, Layout, Typography } from "antd";
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.wrapper}>
      <Layout.Content className={styles.main}>
        <Typography.Title className={styles.title}>О нас</Typography.Title>
        <Typography.Title level={5} className={styles.subtitle}>
          IZI Investment признается одним из самых надежных и комфортных, среди
          всех сайтов, предоставляющих котировки.
        </Typography.Title>
        <Divider orientation="left">Преимущества</Divider>
        <Typography.Paragraph>
          IZI Investment — это сайт с доступом к финансовым рынкам, где вы
          можете в режиме реального времени просматривать данные, котировки,
          графики, последние новости. Посещаемость портала насчитывает свыше 3
          (трех, Карл!) пользователей в месяц, что позволяет IZI Investment
          входить в тройку крупнейших мировых финансовых веб-сайтов по версии
          разработчиков.
          <br />
          <br />
          Сайт IZI Investment предоставляет неограниченный доступ к информации о
          более чем МНОГИХ финансовых инструментов, включая котировки,
          уведомления в режиме реального времени, настраиваемые инвестпортфели,
          персональные уведомления и финансовую аналитику (в виде новостей) — и
          все это совершенно бесплатно. На IZI Investment собрана вся
          необходимая информация о мировых мировых валютах, акциях, облигациях и
          фондах.
        </Typography.Paragraph>
        <Divider orientation="left">Цели</Divider>
        <Typography.Paragraph className={styles.pushFooterToBottom}>
          Цель сервиса — стать лучшим инструментом для инвестора, сэкономить
          время, собрать всю информацию в одном месте. Основной принцип —
          польза. Чтобы сервис был полезным, понятным, удобным и простым (лишь
          бы работал).
        </Typography.Paragraph>
      </Layout.Content>
      <Layout.Footer className={styles.footer}>
        <Typography.Title level={5} className={styles.text}>
          IZI Investment ©2021 All rights reserved
        </Typography.Title>
      </Layout.Footer>
    </div>
  );
};

export default About;
