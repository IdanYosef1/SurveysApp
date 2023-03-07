import { useState } from "react";
import history from "../../myCreatedHistory";
import { login } from "../../axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBool, updateId, updateToken } from "../../Redux/actions";
import Alert from "react-bootstrap/Alert";
import FormSignIn from "../../Components/Forms/FormSignIn";

const urlUsers = process.env.REACT_APP_USERS_URL;

function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateBool(true));
  }, [dispatch]);

  const isSendSuccess = (found) => {
    if (found) {
      sessionStorage.setItem("isAuth", "true");
      dispatch(updateId(found.userId));
      dispatch(updateToken(found.token));
      history.push("/main");
    } else {
      setMessage("Incorrect email or password");
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const found = (await login(urlUsers, user)).data;
      isSendSuccess(found);
    } catch (err) {
      console.log(err);
    }
  };

  const setData = (e) => {
    const { name, value } = e.target;
    const obj = { ...user };
    obj[name] = value;
    setUser(obj);
  };

  const showMessage = message ? (
    <div className="div-alert">
      <Alert className="mb-0 alert-signIn" key="danger" variant="danger">
        {message}
      </Alert>
    </div>
  ) : null;

  return (
    <div className="sign-in">
      <h1>Sign-In</h1>
      {showMessage}
      <br /> <br /> <br />
      <FormSignIn sendData={sendData} setData={setData} />
    </div>
  );
}

export default SignIn;
