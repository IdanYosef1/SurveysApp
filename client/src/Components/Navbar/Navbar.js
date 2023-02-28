import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useEffect, useState } from "react";
import ModalBox from "../Modals/ModalBox";
import { createHashHistory } from "history";

function NavBar() {
  let history = createHashHistory();
  const store = useSelector((store) => store);
  const [colorsButtons, setColors] = useState({
    main: "white",
    approvalOfSurveys: "white",
    requestStatus: "white",
  });

  useEffect(() => {
    const obj = {
      main: "white",
      approvalOfSurveyss: "white",
      requestStatus: "white",
    };
    const pathWithoutSlash = history.location.pathname.slice(1);
    obj[pathWithoutSlash] = "rgb(125, 255, 201)";
    setColors(obj);
  }, [history.location.pathname]);

  const buttonApprovalOfSurveys = (
    <button
      name="approvalOfSurveys"
      style={{ color: colorsButtons.approvalOfSurveys }}
      className="nav-buttons"
      onClick={() => {
        history.push("/approvalOfSurveys");
      }}
      disabled={history.location.pathname === "/approvalOfSurveys"}
    >
      Approval of surveys
    </button>
  );

  const buttonRequestStatus = (
    <button
      name="requestStatus"
      style={{ color: colorsButtons.requestStatus }}
      className="nav-buttons"
      onClick={() => {
        history.push("/requestStatus");
      }}
      disabled={history.location.pathname === "/requestStatus"}
    >
      Request Status
    </button>
  );

  const isAdmin =
    store.userId === "62d31604f7fd43721f01ea6f"
      ? buttonApprovalOfSurveys
      : buttonRequestStatus;

  const exit = () => {
    sessionStorage.setItem("isAuth", "false");
    history.push("/");
  };

  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand>
          <img
            src={require("../../assets/images/logo.png")}
            width="42"
            height="39"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          <div className="div-surveysCenter">Surveys Center</div>
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="nav">
            <button
              name="main"
              style={{
                color:
                  history.location.pathname === "/main"
                    ? "rgb(125, 255, 201)"
                    : "white",
              }}
              className="nav-buttons"
              onClick={() => {
                history.push("/main");
              }}
              disabled={history.location.pathname === "/main"}
            >
              Main
            </button>
            {isAdmin}
            <ModalBox
              callback={exit}
              exitOrDelete={"exit"}
              buttonName={"Exit"}
              buttonStyle={"nav-buttons"}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
