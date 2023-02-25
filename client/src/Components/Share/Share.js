import React from "react";
import { BsShare } from "react-icons/bs";
import { RWebShare } from "react-web-share";

const Share = ({ surveyId, surveyName }) => {
  return (
    <div>
      <RWebShare
        data={{
          url: `https://surveysapp-frontend.onrender.com/survey/${surveyId}`,
          title: `Survey ${surveyName}`,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <button className="button-share">
          <BsShare className="icon-share" />
        </button>
      </RWebShare>
    </div>
  );
};

export default Share;
