import Styles from "./styleInnerChart";

function InnerChart({ answer, classInnerChart }) {
  return (
    <Styles className={classInnerChart} answer={answer}>
      <div className="div-results-answer" id="answer">
        {answer.title.slice(0, 25)}
        {answer.title.length > 26 ? "..." : null}
      </div>
    </Styles>
  );
}

export default InnerChart;
