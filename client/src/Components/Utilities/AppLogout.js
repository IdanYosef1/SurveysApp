import { useHistory } from "react-router-dom";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AppLogout = ({ children }) => {
  let timer;
  const history = useHistory();

  Object.values(events).forEach((item) => {
    window.addEventListener(item, () => {
      resetTimer();
      handleTimer();
    });
  });

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const handleTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      logoutAction();
    }, 600000);
  };

  const logoutAction = () => {
    if (sessionStorage.getItem("isAuth") === "true") {
      sessionStorage.clear();
      history.push("/");
    }
  };
  return children;
};

export default AppLogout;
