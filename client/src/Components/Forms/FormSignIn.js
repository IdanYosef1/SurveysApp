import { Link } from "react-router-dom";
import { BsFillPersonFill, BsKeyFill } from "react-icons/bs";

function FormSignIn({ sendData, setData }) {
  return (
    <form onSubmit={sendData}>
      <BsFillPersonFill className="icons-signUpIn" />
      <input
        type="email"
        name="email"
        onChange={setData}
        placeholder="Email"
        required
      />
      <br />
      <br />
      <BsKeyFill className="icons-signUpIn" />
      <input
        type="password"
        name="password"
        onChange={setData}
        placeholder="Password"
        required
      />
      <br />
      <br />
      <button className="button-login" type="submit">
        Login
      </button>{" "}
      <br />
      <br />
      <span className="newUser">Don't have an account?</span>{" "}
      <Link className="span-SignUpIn" to="/sign-up">
        {" "}
        Sign Up
      </Link>
    </form>
  );
}

export default FormSignIn;
