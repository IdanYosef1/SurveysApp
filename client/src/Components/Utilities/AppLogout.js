import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateToken } from "../../Redux/actions";

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
  let history = useHistory();
  const dispatch = useDispatch();

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
    }, 1000000);
  };

  const logoutAction = () => {
    if (sessionStorage.getItem("isAuth") === "true") {
      dispatch(updateToken(""));
      sessionStorage.clear();
      history.push("/");
    }
  };
  return children;
};

export default AppLogout;
