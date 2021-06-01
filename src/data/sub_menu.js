import {
  FireOutlined,
  RiseOutlined,
  ScheduleOutlined,
  BankOutlined,
  DollarCircleOutlined,
  EyeOutlined,
  FileTextOutlined,
  PercentageOutlined,
} from "@ant-design/icons";

export const subMenuBriefcase = [
  {
    name: "Обзор",
    path: "/briefcase/review",
    icon: <EyeOutlined />,
  },
  {
    name: "Валюта",
    path: "/briefcase/currency",
    icon: <DollarCircleOutlined />,
  },
  {
    name: "Акции",
    path: "/briefcase/shares",
    icon: <PercentageOutlined />,
  },
  {
    name: "Облигации",
    path: "/briefcase/bonds",
    icon: <FileTextOutlined />,
  },
  {
    name: "Фонды",
    path: "/briefcase/funds",
    icon: <BankOutlined />,
  },
];

export const subMenuShowcase = [
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