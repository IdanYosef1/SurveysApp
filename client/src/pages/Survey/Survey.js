import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getAwaitingApprovalById,
  getById,
  updateData,
} from "../../axios";
import { updateSurvey } from "../../Redux/actions";
import Alert from "react-bootstrap/Alert";
import { useEffect } from "react";
import Answer from "../../Components/Answer/Answer";
import ButtonNext from "../../Components/Buttons/ButtonNext";
import history from "../../myCreatedHistory";

const urlUsers = process.env.REACT_APP_USERS_URL;
const urlSurveys = process.env.REACT_APP_SURVEYS_URL;
const urlAnswerings = process.env.REACT_APP_ANSWERINGS_URL;

function Survey() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputCheckBox, setInput] = useState(null);
  const [isFilled, setIsFilled] = useState(false);
  const [message, setMessage] = useState("");
  const [i, setI] = useState(0);
  const [survey, setSurvey] = useState({});
  const [answering, setAnswering] = useState({});
  const { state } = history.location;
  const { id } = useParams();
  const path = history.location.pathname;

  useEffect(() => {
    async function getSurvey() {
      try {
        const data =
          path.slice(1, 18) === "approvalOfSurveys"
            ? (
                await getAwaitingApprovalById(
                  urlUsers,
                  store.userId,
                  id,
                  store.token
                )
              ).data
            : (await getById(urlSurveys, id, store.token)).data;

        setSurvey(data);
        const answeringsData = (await getAll(urlAnswerings, store.token)).data;
        const answering = answeringsData.find(
          (obj) => obj.userId === store.userId
        );
        setAnswering(answering);
      } catch (err) {
        console.log(err);
      }
    }
    getSurvey();
  }, [id, path, store.userId, store.token]);

  const nextQuestion = () => {
    if (state) {
      setI(i + 1);
    } else if (isFilled) {
      inputCheckBox.checked = false;
      setIsFilled(false);
      setI(i + 1);
      setMessage("");
    } else {
      setMessage("It is required to choose one of the options");
    }
  };

  const CompletionSurvey = async () => {
    if (state) {
      history.push("/approvalOfSurveys");
    } else if (isFilled) {
      try {
        await fillOutSurvey();
      } catch (err) {
        console.log(err);
      }
    } else {
      setMessage("It is required to choose one of the options");
    }
  };

  const fillOutSurvey = async () => {
    try {
      if (answering.replied.find((answeringID) => answeringID === id)) {
        setMessage("You have already completed the survey");
      } else {
        await updateData(urlSurveys, id, survey, store.token);
        await updateData(
          urlAnswerings,
          answering._id,
          {
            userId: store.userId,
            replied: [...answering.replied, id],
          },
          store.token
        );
        setI(0);
        history.push(`/shareSurvey/${id}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const setCheckBox = (e) => {
    if (inputCheckBox !== null) {
      inputCheckBox.checked = false;
    }
    e.target.checked = true;
    let num =
      survey.questions[i].answers.filter(
        (obj) => obj.answer === e.target.name
      )[0].votes + 1;
    survey.questions[i].answers.filter(
      (obj) => obj.answer === e.target.name
    )[0].votes = num;
    dispatch(updateSurvey(survey));
    setInput(e.target);
    setIsFilled(true);
  };

  const back = () => {
    history.push("/approvalOfSurveys");
  };

  const isFillOut = store.fillOut ? (
    <button className="button-send" onClick={CompletionSurvey}>
      Send
    </button>
  ) : (
    <button onClick={back}>Back to approval of surveys</button>
  );

  const isContinuation =
    survey.questions && i + 2 <= survey.questions.length ? (
      <ButtonNext func={nextQuestion} />
    ) : (
      isFillOut
    );

  const showH1 = survey.questions ? survey.questions[i].question : null;

  const showAnswers = survey.questions
    ? survey.questions[i].answers.map((obj, index) => {
        return (
          <Answer
            key={index}
            index={index}
            obj={obj}
            setCheckBox={setCheckBox}
          />
        );
      })
    : null;

  const isVisible = message ? "visible" : "hidden";

  return (
    <div>
      <h1 className="h1-surveyname">{survey.surveyname}</h1>
      <div className="div-fillingOutSurvey">
        <h3 className="h1-survey">{showH1}</h3>
        <br />
        <Alert
          className="mb-0 alert-survey"
          style={{ visibility: isVisible }}
          key="danger"
          variant="danger"
        >
          {message}
        </Alert>

        <div className="div-answers">{showAnswers}</div>
        {isContinuation}
      </div>
    </div>
  );
}

export default Survey;
