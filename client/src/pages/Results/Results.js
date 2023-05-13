import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import React from "react";
import { getById } from "../../axios";
import { useParams } from "react-router-dom";
import NoResults from "../../Components/NoResults/NoResults";
import ResultsSurvey from "../../Components/ResultsSurvey/ResultsSurvey";
import MainSpinner from "../../Components/Spinner/Spinner";

const urlSurveys = process.env.REACT_APP_SURVEYS_URL;

function Results() {
  const store = useSelector((state) => state);
  const [bool, setBool] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getSurvey() {
      try {
        const data = (await getById(urlSurveys, id, store.token)).data;
        new Date() >= new Date(data.expiredDate)
          ? setBool(true)
          : setBool(false);
      } catch (err) {
        console.log(err);
      }
    }
    getSurvey();
  }, [id, store.token]);

  let showComp =
    bool === null ? (
      <MainSpinner />
    ) : bool ? (
      <ResultsSurvey />
    ) : (
      <div className="div-surveys">
        <br />
        <h1 className="h1-main">Results survey</h1>
        <br />
        <div className="div-survey">
          <NoResults
            text={
              "The results of the survey cannot be accessed until it is finished"
            }
          />
        </div>
        <br />
      </div>
    );

  return <div>{showComp}</div>;
}

export default Results;
