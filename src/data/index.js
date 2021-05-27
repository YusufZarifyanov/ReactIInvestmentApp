import {
    BankOutlined,
    DollarCircleOutlined,
    EyeOutlined,
    FileTextOutlined,
    PercentageOutlined,
  } from "@ant-design/icons";

export const subMenuItems = [
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
