function convertTimestamp(timestamp) {
  let d = new Date(timestamp * 1000),
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2),
    dd = ("0" + d.getDate()).slice(-2),
    h = d.getHours(),
    min = ("0" + d.getMinutes()).slice(-2),
    sec = ("0" + d.getSeconds()).slice(-2),
    ampm = "AM",
    time;

  time = yyyy + "-" + mm + "-" + dd + " " + h + ":" + min + ":" + sec;
  return time;
} 

module.exports = {
  convertTimestamp,
};
