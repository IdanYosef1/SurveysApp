import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Timer from "../Timer/Timer";
import { Card } from "react-bootstrap";
import DetailsSurvey from "../DetailsSurvey/DetailsSurvey";
import {
  createData,
  deleteAll,
  deleteData,
  deleteFromArray,
  updateStatus,
} from "../../axios";
import {
  updateAnswering,
  updateBool,
  updateFillOut,
  updateSurvey,
} from "../../Redux/actions";
import ModalBox from "../Modals/ModalBox";
import history from "../../myCreatedHistory";

const urlUsers = process.env.REACT_APP_USERS_URL;
const urlSurveys = process.env.REACT_APP_SURVEYS_URL;
const urlAnswerings = process.env.REACT_APP_ANSWERINGS_URL;

function SurveyCard({
  surveyProps,
  replied,
  answering,
  isActive,
  awaiting,
  mainBool,
  setMainBool,
}) {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();

  const fillOut = () => {
    dispatch(updateSurvey(surveyProps));
    dispatch(updateAnswering(answering));
    dispatch(updateFillOut(true));
    history.push(`/survey/${surveyProps._id}`);
  };

  const deleteSurvey = async () => {
    try {
      await deleteData(urlSurveys, surveyProps._id, store.token);
      await deleteAll(urlAnswerings, surveyProps._id, store.token);
      dispatch(updateBool(!store.bool));
    } catch (err) {
      console.log(err);
    }
  };

  const isFillOut =
    replied === false ? (
      <button
        variant="success"
        className={
          store.userId === "62d31604f7fd43721f01ea6f"
            ? "button-FillOut"
            : "button-FillOut-User"
        }
        onClick={fillOut}
      >
        Fill out
      </button>
    ) : null;

  const isAdmin =
    store.userId === "62d31604f7fd43721f01ea6f" ? (
      <ModalBox
        callback={deleteSurvey}
        exitOrDelete={"delete"}
        buttonName={"Delete"}
        buttonStyle={
          replied ? "button-delete-single" : "button-delete-modalBox"
        }
      />
    ) : null;

  const results = () => {
    dispatch(updateSurvey(surveyProps));
    history.push(`/results/${surveyProps._id}`);
  };

  const view = () => {
    dispatch(updateSurvey(surveyProps));
    dispatch(updateFillOut(true));
    history.push({
      pathname: `/approvalOfSurvey/survey/${surveyProps._id}`,
      state: { view: true },
    });
  };

  const approve = async () => {
    try {
      await createData(urlSurveys, surveyProps, store.token);
      await deleteFromArray(
        urlUsers,
        store.userId,
        surveyProps._id,
        store.token
      );
      await updateStatus(
        urlUsers,
        surveyProps.surveyname,
        {
          status: "aprroved",
        },
        store.token
      );
      setMainBool(!mainBool);
    } catch (err) {
      console.log(err);
    }
  };

  const deny = async () => {
    try {
      await deleteFromArray(
        urlUsers,
        store.userId,
        surveyProps._id,
        store.token
      );
      await updateStatus(
        urlUsers,
        surveyProps.surveyname,
        {
          status: "rejected",
        },
        store.token
      );
      setMainBool(!mainBool);
    } catch (err) {
      console.log(err);
    }
  };

  const isAwaitingOrActive = awaiting ? (
    <div className="div-InnerSurveyCard">
      <Card.Subtitle className="mb-2 text-muted">
        <Timer date={new Date(surveyProps.expiredDate).getTime()} />
      </Card.Subtitle>
      <DetailsSurvey surveyProps={surveyProps} />
      <button onClick={view} variant="success" className="button-viewSurvey">
        View Survey
      </button>
      <ModalBox
        callback={approve}
        exitOrDelete={"approve"}
        buttonName={"Approve"}
        buttonStyle={"button-approve"}
      />
      <ModalBox
        callback={deny}
        exitOrDelete={"deny"}
        buttonName={"Deny"}
        buttonStyle={"button-deny"}
      />
    </div>
  ) : isActive ? (
    <div className="div-Active">
      <Card.Subtitle className="mb-2 text-muted">
        <Timer date={new Date(surveyProps.expiredDate).getTime()} />
      </Card.Subtitle>
      <DetailsSurvey surveyProps={surveyProps} surveyOrResults={"survey"} />
      {isFillOut} {isAdmin}
    </div>
  ) : (
    <div className="div-SurveyCard-Results">
      <br />
      <DetailsSurvey surveyProps={surveyProps} surveyOrResults={"results"} />
      <button className="viewResults" onClick={results}>
        View results
      </button>
    </div>
  );

  return (
    <Card className={awaiting ? "card-awaitingApproval" : "card-activeSurvey"}>
      <Card.Body>
        <Card.Title className="marginTop-0">
          {surveyProps.surveyname}
        </Card.Title>
        {isAwaitingOrActive}
      </Card.Body>
    </Card>
  );
}

export default SurveyCard;
