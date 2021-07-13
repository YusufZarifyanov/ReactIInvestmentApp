export const tickersData = {
  currency: ["AAPL", "IBM"],
  shares: ["MSFT"],
  bonds: ["BABA"],
  funds: ["IBM"],
};

export const dateArray = [
  {
    index: "1",
    name: "День",
    interval: "1m",
    range: "1d",
    loading: false,
  },
  {
    index: "2",
    name: "Неделя",
    interval: "15m",
    range: "5d",
  },
  {
    index: "3",
    name: "Месяц",
    interval: "60m",
    range: "1mo",
    loading: false,
  },
  {
    index: "4",
    name: "Полгода",
    interval: "1d",
    range: "6mo",
    loading: false,
  },
  {
    index: "5",
    name: "Год",
    interval: "1d",
    range: "1y",
    loading: false,
  },
  {
    index: "6",
    name: <i className="fa fa-arrows-v" aria-hidden="true"></i>,
    action: "changeGraph",
    loading: false,
  },
];

export var loadingForBtns = new Array(6).fill(false);
