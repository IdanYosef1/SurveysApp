import { BsFillPeopleFill, BsQuestionCircle } from "react-icons/bs";
import ReactTooltip from "react-tooltip";
import Share from "../Share/Share";

function DetailsSurvey({ surveyProps }) {
  return (
    <div className="div-details">
      <div className="div-number">
        <div className="margin-auto" data-tip="Number of questions">
          <ReactTooltip place="top" type="info" effect="float" />
          <BsQuestionCircle /> {surveyProps.numOfQuestions}
        </div>
      </div>
      <div className="div-number">
        <div className="margin-auto" data-tip="Number of participants">
          <ReactTooltip place="top" type="info" effect="float" />
          <BsFillPeopleFill /> {surveyProps.numOfParticipants}
        </div>
      </div>
      <div className="div-number">
        <div className="margin-auto" data-tip="Share">
          <Share
            surveyId={surveyProps._id}
            surveyName={surveyProps.surveyname}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsSurvey;
