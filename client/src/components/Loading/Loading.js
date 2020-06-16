import * as React from "react";

function Loading() {
  const [loading, setLoading] = React.useState("Loading");

  useInterval(
    () =>
      loading === "Loading..."
        ? setLoading("Loading")
        : setLoading((prevText) => prevText + "."),
    300
  );

  return <div className='loading-wrapper'>{loading}</div>;
}

function useInterval(cb, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = cb;
  });

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let intervalID = setInterval(tick, delay);
      return () => clearInterval(intervalID);
    }
  }, [delay]);
}

export default Loading;
