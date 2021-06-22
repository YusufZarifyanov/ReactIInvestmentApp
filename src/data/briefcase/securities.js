
exports.getSymbolData = async (ticker, numberOfSecurities) => {
  const tickerInfo = await fetch(
    `https://finnhub.io/api/v1/stock/profile2?symbol=${ticker}&token=c304pgqad3ifkigc82q0`
  )
    .then((data) => data.json())
    .catch((err) => console.log(err));

  const tickerPrice = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=VAUVU4KVB5DXM9ED`)
  .then(res => res.json())
  .catch((err) => console.log(err));
  return {...tickerInfo, count: numberOfSecurities, ...tickerPrice};
};




module.exports = {
  currency: {
    name: "Валюта",
    data: [],
    tickers: ["AAPL"],
  },
  shares: {
    name: "Акции",
    data: [],
    tickers: ["MSFT"],
  },

  bonds: {
    name: "Облигации",
    data: [],
    tickers: ["BABA"],
  },

  funds: {
    name: "Фонды",
    data: [],
    tickers: ["IBM"],
  },
};
