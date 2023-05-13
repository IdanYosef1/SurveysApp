import NoResults from "../NoResults/NoResults";

function Surveys({ text, h1, activeOrInactive }) {
  return (
    <div className="div-surveys">
      <h1 className="h1-main">{h1}</h1>
      <br />
      <div className="div-survey">
        {activeOrInactive.length !== 0 ? (
          activeOrInactive
        ) : (
          <NoResults text={text} />
        )}
      </div>
      <br />
    </div>
  );
}

export default Surveys;
