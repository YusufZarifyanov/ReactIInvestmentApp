
const getSymbolData = async (ticker, numberOfSecurities) => {
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

const currencyTikers = ["AAPL", "MSFT"];
const sharesTickers = [];
const fundsTickers = [];
const bondsTickers = [];

const currencyInfo = [],
  sharesInfo = [],
  bondsInfo = [],
  fundsInfo = [];

// const socket = new WebSocket('wss://ws.finnhub.io?token=c304pgqad3ifkigc82q0');

// // Connection opened -> Subscribe
// socket.addEventListener('open', function (event) {
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'BINANCE:BTCUSDT'}))
//     socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'IC MARKETS:1'}))
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });

// // Unsubscribe
//  var unsubscribe = function(symbol) {
//     socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
// }

const getTickerData = async () => {
  for (let currency of currencyTikers) {
    currencyInfo.push(await getSymbolData(currency, 2));
  }

  for (let shares of sharesTickers) {
    sharesInfo.push(await getSymbolData(shares, 3));
  }

  for (let bonds of bondsTickers) {
    bondsInfo.push(await getSymbolData(bonds, 4));
  }

  for (let funds of fundsTickers) {
    fundsInfo.push(await getSymbolData(funds, 5));
  }

  return;
};

getTickerData();

module.exports = {
  currency: {
    name: "Валюта",
    data: currencyInfo,
  },
  shares: {
    name: "Акции",
    data: sharesInfo,
  },

  bonds: {
    name: "Облигации",
    data: bondsInfo,
  },

  funds: {
    name: "Фонды",
    data: fundsInfo,
  },
};
