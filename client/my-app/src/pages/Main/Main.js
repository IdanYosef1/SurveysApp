import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getAll } from "../../axios";
import { useSelector } from "react-redux";
import Menu from "../../Components/Menu/Menu";
import Surveys from "../../Components/Cards/Surveys";
import SurveyCard from "../../Components/Cards/SurveyCard";
import MainSpinner from "./Spinner";

const urlSurveys = process.env.REACT_APP_SURVEYS_URL;
const urlAnswerings = "http://localhost:8001/api/answerings";

function Main() {
  let history = useHistory();
  const store = useSelector((store) => store);
  const [surveys, setSurveys] = useState({
    all: [],
    allProjects: [],
    allUser: [],
    userSurveys: [],
    bool: true,
    active: false,
    inActive: false,
    classAll: "clicked",
    classMy: "default",
  });
  const [wordsToSearch, setWordsToSearch] = useState("");
  const [sortArr, setSortArr] = useState("1");
  const [isChange, setIsChange] = useState(false);
  const [answerings, setAnswerings] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    async function getSurveys() {
      try {
        const data = (await getAll(urlSurveys, store.token)).data;
        setSurveys({
          all: data,
          allProjects: data,
          allUser: [],
          userSurveys: [],
          bool: true,
          classAll: "clicked",
          classMy: "default",
        });
        const answeringsData = (await getAll(urlAnswerings, store.token)).data;
        setAnswerings(answeringsData);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getSurveys();
  }, [store]);

  const addSurvey = () => {
    history.push("/addsurvey");
  };

  const allSurveys = () => {
    setSurveys({
      ...surveys,
      allProjects: surveys.all,
      bool: true,
      active: false,
      inActive: false,
      classAll: "clicked",
      classMy: "default",
    });
    setSortArr("1");
    setWordsToSearch("");
  };

  const sortByDate = (arr, date) => {
    arr.sort((a, b) => {
      if (
        new Date(a[date].slice(0, 10)) - new Date(b[date].slice(0, 10)) ===
        0
      ) {
        if (a[date].slice(11, 16) > b[date].slice(11, 16)) {
          return 1;
        } else if (a[date].slice(11, 16) < b[date].slice(11, 16)) {
          return -1;
        } else {
          return 0;
        }
      }
      return new Date(a[date].slice(0, 10)) - new Date(b[date].slice(0, 10));
    });
  };

  const sortByUploadDate = (arr) => {
    sortByDate(arr, "uploadDate");
  };

  const sortByExpiredDate = (arr) => {
    sortByDate(arr, "expiredDate");
  };

  const sortByDateRev = (arr) => {
    if (isChange) {
      arr.reverse();
      setIsChange(false);
    }
  };

  let arr = surveys.bool ? surveys.allProjects : surveys.userSurveys;

  const sortSurveys = () => {
    switch (sortArr) {
      case "1":
        sortByUploadDate(arr);
        break;

      case "2":
        sortByDateRev(arr);
        break;

      case "3":
        arr.sort((a, b) => b.numOfParticipants - a.numOfParticipants);
        break;

      case "4":
        arr.sort((a, b) => a.numOfParticipants - b.numOfParticipants);
        break;

      case "5":
        sortByExpiredDate(arr);
        break;

      case "6":
        sortByDateRev(arr);
        break;

      default:
        break;
    }
  };
  sortSurveys();

  const showSurveysActive = [];
  const showSurveysInActive = [];

  const pushToActiveOrInactive = (isValid, survey, replied, answering) => {
    if (isValid) {
      showSurveysActive.push(
        <SurveyCard
          key={survey._id}
          surveyProps={survey}
          replied={replied}
          answering={answering}
          isActive={true}
        />
      );
    } else {
      showSurveysInActive.push(
        <SurveyCard key={survey._id} surveyProps={survey} isActive={false} />
      );
    }
  };

  const divisionSurveys = () => {
    arr.forEach((survey) => {
      let d1 = new Date();
      let d2 = new Date(survey.expiredDate);
      let isValid = d1.getTime() < d2.getTime();
      const answering = answerings.find((obj) => obj.userId === store.userId);
      const replied = answering
        ? answering.replied.some((item) => item === survey._id)
        : false;
      pushToActiveOrInactive(isValid, survey, replied, answering);
    });
  };
  divisionSurveys();

  const userSurveys = () => {
    const arrSurveys = surveys.all.filter(
      (survey) => survey.creatorId === store.userId
    );
    setSurveys({
      ...surveys,
      allUser: arrSurveys,
      userSurveys: arrSurveys,
      bool: false,
      active: false,
      inActive: false,
      classAll: "default",
      classMy: "clicked",
    });
    setSortArr("1");
    setWordsToSearch("");
  };

  const onlyActive = () => {
    setSurveys({ ...surveys, active: true, inActive: false });
  };

  const onlyInActive = () => {
    setSurveys({ ...surveys, active: false, inActive: true });
  };

  const sortBy = (e) => {
    setSortArr(e.value);
    setIsChange(true);
  };
  const handleChange = (e) => {
    setWordsToSearch(e.target.value);
  };

  const searchSurvey = () => {
    if (surveys.bool) {
      setSurveys({
        ...surveys,
        allProjects: surveys.all.filter((survey) =>
          survey.surveyname
            .toLowerCase()
            .startsWith(wordsToSearch.toLowerCase())
        ),
      });
    } else {
      setSurveys({
        ...surveys,
        userSurveys: surveys.allUser.filter((survey) =>
          survey.surveyname
            .toLowerCase()
            .startsWith(wordsToSearch.toLowerCase())
        ),
      });
    }
  };

  const showActive = !surveys.inActive ? (
    <Surveys
      text={"No active surveys available"}
      h1={"Active surveys"}
      activeOrInactive={showSurveysActive}
    />
  ) : null;

  const showInactive = !surveys.active ? (
    <Surveys
      text={"No inactive surveys available"}
      h1={"Inactive surveys"}
      activeOrInactive={showSurveysInActive}
    />
  ) : null;

  return isLoading ? (
    <MainSpinner />
  ) : (
    <div className="div-main">
      <div className="div-activeSurveys">
        <Menu
          surveys={surveys}
          allSurveys={allSurveys}
          userSurveys={userSurveys}
          onlyActive={onlyActive}
          onlyInActive={onlyInActive}
          wordsToSearch={wordsToSearch}
          handleChange={handleChange}
          searchSurvey={searchSurvey}
          sortArr={sortArr}
          sortBy={sortBy}
        />
        <hr className="hr-main" />
        <button className="button-addSurvey" onClick={addSurvey}>
          Add Survey
        </button>
        <br />
        <br />
        {showActive}
        {showInactive}
      </div>
      <br />
    </div>
  );
}

export default Main;
