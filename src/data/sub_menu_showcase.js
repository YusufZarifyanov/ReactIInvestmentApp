import {
    FireOutlined,
    RiseOutlined,
    ScheduleOutlined
  } from "@ant-design/icons";

export const subMenuItems = [
    {
      name: "Топ Просмотров",
      path: '/showcase/topviews',
      icon: <FireOutlined />,
    },
    {
      name: "Взлеты и Падения",
      path: '/showcase/upsdowns',
      icon: <RiseOutlined />,
    },
    {
      name: "События",
      path: '/showcase/events',
      icon: <ScheduleOutlined />,
    },
  ];