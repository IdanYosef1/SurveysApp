import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SurveyCard from "../../Components/Cards/SurveyCard";
import Surveys from "../../Components/Cards/Surveys";
import MainSpinner from "../Main/Spinner";

function ApprovalSurveys({ mainBool, setMainBool }) {
  const store = useSelector((state) => state);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function getAdmin() {
      try {
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getAdmin();
  }, [store.userId, store.token]);

  const awaitingsApproval = store.awaitingsApproval.map((survey) => {
    return (
      <SurveyCard
        key={survey._id}
        surveyProps={survey}
        awaiting={true}
        mainBool={mainBool}
        setMainBool={setMainBool}
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
