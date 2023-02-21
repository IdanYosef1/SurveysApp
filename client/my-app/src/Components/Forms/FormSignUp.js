import {
  BsFillPersonFill,
  BsKeyFill,
  BsPhone,
  BsEnvelope,
  BsCalendarEvent,
} from "react-icons/bs";

function FormSignUp({ sendData, setData }) {
  return (
    <form onSubmit={sendData}>
      <div id="sign-in-button"></div>
      <BsFillPersonFill className="icons-signUpIn" />
      <input
        type="text"
        name="username"
        onChange={setData}
        placeholder="Username"
        required
      />{" "}
      <br />
      <br />
      <BsKeyFill className="icons-signUpIn" />
      <input
        type="password"
        name="password"
        minLength="8"
        onChange={setData}
        placeholder="Password"
        required
      />
      <br />
      <br />
      <BsEnvelope className="icons-signUpIn" />
      <input
        type="email"
        name="email"
        onChange={setData}
        placeholder="Email"
        required
      />
      <br />
      <br />
      <BsPhone className="icons-signUpIn" />
      <input
        type="tel"
        name="phone"
        onChange={setData}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        placeholder="Phone"
        required
      />
      <br />
      <br />
      <BsCalendarEvent className="icons-signUpIn" />
      <input
        type="number"
        min={0}
        name="age"
        onChange={setData}
        placeholder="Age"
        required
      />
      <br />
      <br />
      <button className="button-login" type="submit">
        Sign Up
      </button>{" "}
    </form>
  );
}

export default FormSignUp;
