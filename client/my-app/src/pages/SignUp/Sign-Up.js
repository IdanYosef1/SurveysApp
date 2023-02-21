import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createData } from "../../axios";
import { useSelector } from "react-redux";
import FormSignUp from "../../Components/Forms/FormSignUp";
import Alert from "react-bootstrap/Alert";

const urlUsers = process.env.REACT_APP_USERS_URL;
const urlAnswerings = process.env.REACT_APP_ANSWERINGS_URL;

function SignUp() {
  let history = useHistory();
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
    age: 0,
    phone: "",
    email: "",
    requestStatus: [],
  });
  const store = useSelector((state) => state);

  const setData = (e) => {
    const { name, value } = e.target;
    const obj = { ...user };
    obj[name] = value;
    setUser(obj);
  };

  const sendData = async (e) => {
    e.preventDefault();
    try {
      const newUser = (await createData(urlUsers, user, store.token)).data;
      await createData(
        urlAnswerings,
        {
          userId: newUser._id,
          replied: [],
        },
        store.token
      );
      if (typeof newUser === "string") {
        setMessage(newUser);
      } else {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showMessage = message ? (
    <div className="div-alert">
      <Alert className="mb-0 alert-signUp" key="danger" variant="danger">
        {message}
      </Alert>
    </div>
  ) : null;

  return (
    <div className="sign-up">
      <h1>Sign-Up</h1>
      {showMessage}
      <br /> <br />
      <div className="div-form-signUp">
        <FormSignUp sendData={sendData} setData={setData} />
        <br />
        <span className="newUser">Already have an account?</span>{" "}
        <Link className="span-SignUpIn" to="/">
          Log in
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
