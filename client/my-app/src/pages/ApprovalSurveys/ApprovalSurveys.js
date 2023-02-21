import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getById } from "../../axios";
import SurveyCard from "../../Components/Cards/SurveyCard";
import Surveys from "../../Components/Cards/Surveys";
import MainSpinner from "../Main/Spinner";

const urlUsers = process.env.REACT_APP_USERS_URL;

function ApprovalSurveys() {
  const store = useSelector((state) => state);
  const [bool, setBool] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [surveysApproval, setApproval] = useState([]);

  useEffect(() => {
    async function getAdmin() {
      try {
        const data = (await getById(urlUsers, store.userId, store.token)).data;
        setApproval(data.awaitingApproval);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getAdmin();
  }, [store.userId, store.token, bool]);

  const update = () => {
    setBool(!bool);
  };

  const awaitingsApproval = surveysApproval.map((survey) => {
    return (
      <SurveyCard
        key={survey._id}
        update={update}
        surveyProps={survey}
        awaiting={true}
      />
    );
  });

  return isLoading ? (
    <MainSpinner />
  ) : (
    <div className="div-approvalSurveys">
      <Surveys
        text={"No surveys pending approval available"}
        h1={"Surveys awaiting approval"}
        activeOrInactive={awaitingsApproval}
      />
    </div>
  );
}

export default ApprovalSurveys;
