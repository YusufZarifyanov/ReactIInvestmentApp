const convertTimestamp = (timestamp) => {
  let d = new Date(timestamp * 1000),
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2),
    dd = ("0" + d.getDate()).slice(-2),
    h = d.getHours(),
    min = ("0" + d.getMinutes()).slice(-2),
    sec = ("0" + d.getSeconds()).slice(-2),
    time;

  time = yyyy + "-" + mm + "-" + dd + " " + h + ":" + min + ":" + sec;
  return time;
};

const findTicker = (tickers, ticker) => {
  console.log('go fun')
  if (!tickers) return -1;
  for (let tickerEl of tickers) {
    if (tickerEl.symbol === ticker) return tickerEl;
  }
  return -1
}

module.exports = {
  convertTimestamp,
  findTicker
};
