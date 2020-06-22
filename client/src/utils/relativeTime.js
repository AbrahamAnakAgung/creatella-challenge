/**
 * Display relative time
 * @param {string} time eg. 'Sat Jun 06 2020 21:06:10 GMT+0700 (Western Indonesia Time)'
 * @return {string} eg. 1 Day ago or full date in string
 */
export const relativeTime = (time) => {
  const now = Date.now();
  const addTime = +new Date(time); // time in ms since 1/1/1970
  const diff = Math.floor((now - addTime) / 1000); // in seconds

  const sec = 1,
    min = sec * 60,
    hour = min * 60,
    day = hour * 24,
    week = day * 7;

  // options for Intl.DateTimeFormat
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  let result = "";

  if (diff < min) {
    result = calcRelTime(diff, sec, 0);
  } else if (diff < hour) {
    result = calcRelTime(diff, min, 1);
  } else if (diff < day) {
    result = calcRelTime(diff, hour, 2);
  } else if (diff < week) {
    result = calcRelTime(diff, day, 3);
  } else {
    result = new Intl.DateTimeFormat("default", options).format(addTime);
  }
  return result;
};

/**
 * Calculate relative time compare to Date.now()
 * @param {number} d difference time between added and now()
 * @param {number} unit seconds
 * @param {number} index timeUnit index
 * @return {string} 
 */
const calcRelTime = (d, unit, index) => {
  const timeUnit = ["secs", "mins", "hours", "days"];
  const time = Math.floor(d / unit);
  let result = // check if time === 1 use singular time unit
    time > 1
      ? `${time} ${timeUnit[index]}`
      : `${time} ${timeUnit[index].slice(0, -1)}`;
  return result + " ago";
};
