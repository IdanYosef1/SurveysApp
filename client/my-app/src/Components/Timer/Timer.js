import { useState } from "react";
import { useEffect } from "react";

function Timer({ date }) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    let timerID = setInterval(() => {
      setTime(Date.now());
    }, 1000);
    return function cleanup() {
      clearInterval(timerID);
    };
  }, [time, date]);

  const msToTime = (duration) => {
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days = Math.floor(duration / (1000 * 60 * 60 * 24));

    days = days < 10 ? "0" + days : days;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return days + ":" + hours + ":" + minutes + ":" + seconds;
  };

  return <div>{date - time > 0 ? msToTime(date - time) : "00:00:00:00"}</div>;
}

export default Timer;
