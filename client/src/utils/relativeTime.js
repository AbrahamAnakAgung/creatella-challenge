/*
helper function to display relative time.
@params: (time:string): 'Sat Jun 06 2020 21:06:10 GMT+0700 (Western Indonesia Time)'
@return: String
*/
export const relativeTime = (time) => {
  const now = Date.now();
  const addTime = +new Date(time); // time in ms since 1/1/1970
  const difference = now - addTime;
  const timeUnit = ["secs", "mins", "hours", "days"];
  const weekInSeconds = 3600 * 24 * 7;
  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  let result = "";

  if (difference >= weekInSeconds) {
    result = new Intl.DateTimeFormat("default", options).format(addTime);
    return result;
  }

  let second;
  return;
};
