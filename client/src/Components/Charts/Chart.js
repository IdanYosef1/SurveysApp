import ReactTooltip from "react-tooltip";
import AnswerValue from "./AnswerValue";
import InnerChart from "./InnerChart";

function Chart({ data, max, equal }) {
  const showAnswers = data.map((answer) => {
    let classChart = "chart";
    let classInnerChart = "innerChart";
    if (answer.id === max.id && !equal) {
      classChart = "chartMax";
      classInnerChart = "innerChartMax";
    }
    return (
      <div key={answer.id} data-tip={answer.title} className={classChart}>
        <ReactTooltip place="top" type="info" effect="float" />
        <InnerChart answer={answer} classInnerChart={classInnerChart} />
        <AnswerValue answer={answer} />
      </div>
    );
  });

  return <div className="div-results-answers">{showAnswers}</div>;
}

export default Chart;
