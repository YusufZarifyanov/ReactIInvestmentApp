
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

// const currencyTikers = ["AAPL", "MSFT", "AMZN", "GOOGL", "FB", "TSM"];
// const sharesTickers = ["BABA", "V", "JPM", "NVDA"];
// const fundsTickers = ["JNJ", "MA", "BAC", "HD"];
// const bondsTickers = ["XOM", "TTD", "PYPL", "ASML"];


// const currencyInfo = [],
//   sharesInfo = [],
//   bondsInfo = [],
//   fundsInfo = [];


// const getTickerData = async () => {
  // for (let currency of currencyTikers) {
  //   currencyInfo.push(await getSymbolData(currency, 2));
  // }

  // for (let shares of sharesTickers) {
  //   sharesInfo.push(await getSymbolData(shares, 3));
  // }

  // for (let bonds of bondsTickers) {
  //   bondsInfo.push(await getSymbolData(bonds, 4));
  // }

  // for (let funds of fundsTickers) {
  //   fundsInfo.push(await getSymbolData(funds, 5));
  // }

//   return;
// };

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
