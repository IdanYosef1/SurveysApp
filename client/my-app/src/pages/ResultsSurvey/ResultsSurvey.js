import { Card } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React from "react";
import { nanoid } from "nanoid";
import Chart from "../../Components/Charts/Chart";
import ButtonNext from "../../Components/Buttons/ButtonNext";
import ButtonBack from "../../Components/Buttons/ButtonBack";

function ResultsSurvey() {
  const store = useSelector((state) => state.currentSurvey);
  const [i, setI] = useState(0);
  let history = useHistory();
  const colors = ["#53829F", "#5DADE2", "#2E86C1", "#21618C", "#154360"];

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

  const data = store.questions[i].answers.map((obj, index) => {
    const ratio =
      obj.votes === 0 && store.numOfParticipants === 0
        ? 0
        : obj.votes / store.numOfParticipants;
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
    i + 2 <= store.questions.length ? (
      <ButtonNext func={nextResult} />
    ) : (
      <button className="button-end" onClick={finishResults}>
        End
      </button>
    );

  const isBack = i > 0 ? <ButtonBack func={backResult} /> : null;

  return (
    <div>
      <h1 className="h1-surveyname">{store.surveyname}</h1>
      <Card className="card-results">
        <Card.Body className="card-body">
          <div className="div-chart">
            <h3 className="h3-results"> {store.questions[i].question}</h3>
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
