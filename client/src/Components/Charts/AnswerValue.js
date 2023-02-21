import CountUp from "react-countup";

function AnswerValue({ answer }) {
  return (
    <div className="div-answerValue">
      <CountUp start={0} end={answer.value} delay={0} decimals={2}>
        {({ countUpRef }) => (
          <div>
            <span ref={countUpRef} />%
          </div>
        )}
      </CountUp>
    </div>
  );
}

export default AnswerValue;
