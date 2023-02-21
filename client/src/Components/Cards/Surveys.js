import img from "../../assets/images/urban-no-data-found-2.png";

function Surveys({ text, h1, activeOrInactive }) {
  return (
    <div className="div-surveys">
      <h1 className="h1-main">{h1}</h1>
      <br />
      <div className="div-survey">
        {activeOrInactive.length !== 0 ? (
          activeOrInactive
        ) : (
          <div className="margin-auto">
            <img src={img} alt="undefined" className="img-surveys" />
            <span className="span-surveys">{text}</span>
          </div>
        )}
      </div>
      <br />
    </div>
  );
}

export default Surveys;
