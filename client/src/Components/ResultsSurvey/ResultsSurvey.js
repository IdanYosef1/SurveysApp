import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import history from "../../myCreatedHistory";
import React from "react";
import { nanoid } from "nanoid";
import Chart from "../../Components/Charts/Chart";
import ButtonNext from "../../Components/Buttons/ButtonNext";
import ButtonBack from "../../Components/Buttons/ButtonBack";
import { getById } from "../../axios";
import { useParams } from "react-router-dom";

const urlSurveys = process.env.REACT_APP_SURVEYS_URL;

function ResultsSurvey() {
  const store = useSelector((state) => state);
  const [questions, setQuestions] = useState([
    { answers: [{ _id: "", answer: "", votes: 0 }], question: "" },
  ]);
  const [surveyName, setSurveyName] = useState("");

  const [i, setI] = useState(0);
  const { id } = useParams();
  const colors = ["#53829F", "#5DADE2", "#2E86C1", "#21618C", "#154360"];

  useEffect(() => {
    async function getSurvey() {
      try {
        const data = (await getById(urlSurveys, id, store.token)).data;
        setSurveyName(data.surveyname);
        setQuestions(data.questions);
      } catch (err) {
        console.log(err);
      }
    }
    getSurvey();
  }, [id, store.token]);

  const nextResult = () => {
    setI(i + 1);
  };

  const backResult = () => {
    setI(i - 1);
  };

  const finishResults = () => {
    try {
      setI(0);
      history.push("/main");
    } catch (err) {
      console.log(err);
    }
  };

  let numOfParticipants = questions[i].answers.reduce(
    (sum, answer) => sum + answer.votes,
    0
  );
  const data = questions[i].answers.map((obj, index) => {
    const ratio =
      obj.votes === 0 && numOfParticipants === 0
        ? 0
        : obj.votes / numOfParticipants;
    return {
      id: nanoid(),
      title: obj.answer,
      value: Number((ratio * 100).toFixed(2)),
      color: colors[index],
    };
  });

  let equal = true;
  const max = data.reduce((prev, current) => {
    if (prev.value === current.value) {
      equal = true;
      return current;
    } else if (prev.value > current.value) {
      equal = false;
      return prev;
    } else {
      equal = false;
      return current;
    }
  });

  const isContinuation =
    i + 2 <= questions.length ? (
      <ButtonNext func={nextResult} />
    ) : (
      <button className="button-end" onClick={finishResults}>
        End
      </button>
    );

  const isBack = i > 0 ? <ButtonBack func={backResult} /> : null;

  return (
    <div>
      <h1 className="h1-surveyname">{surveyName}</h1>
      <Card className="card-results">
        <Card.Body className="card-body">
          <div className="div-chart">
            <h3 className="h3-results"> {questions[i].question}</h3>
            <br />
            <Chart data={data} max={max} equal={equal} />
            <br />
          </div>
          {isBack}
          {isContinuation}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ResultsSurvey;
