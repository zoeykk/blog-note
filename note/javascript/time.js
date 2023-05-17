const dateFormat = (date, format = "YYYY-MM-DD") => {
  if (!date) return "-";
  const _date = new Date(date);
  if (_date.toString() === "Invalid Date") {
    return "-";
  }
  const config = {
    YYYY: `${_date.getFullYear()}`.padStart(2, 0),
    MM: `${_date.getMonth() + 1}`.padStart(2, 0),
    DD: `${_date.getDate()}`.padStart(2, 0),
    HH: `${_date.getHours()}`.padStart(2, 0),
    mm: `${_date.getMinutes()}`.padStart(2, 0),
    ss: `${_date.getSeconds()}`.padStart(2, 0),
  };
  for (const key in config) {
    format = format.replace(key, config[key]);
  }
  return format;
};

console.log(dateFormat(1666688004214));
