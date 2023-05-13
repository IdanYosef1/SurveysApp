import img from "../../assets/images/urban-no-data-found-2.png";

function NoResults({ text }) {
  return (
    <div className="margin-auto">
      <img src={img} alt="undefined" className="img-surveys" />
      <span className="span-surveys">{text}</span>
    </div>
  );
}

export default NoResults;
