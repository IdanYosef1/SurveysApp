import { BsQuestionCircleFill, BsXLg } from "react-icons/bs";

function Questions({ index, question, changeDetails, deleteQuestion }) {
  return (
    <div className="div-questions">
      <div>
        <BsQuestionCircleFill color="rgb(166, 255, 163)" size="25" />
      </div>
      <button className="div-question" onClick={() => changeDetails(index)}>
        {question.question}
      </button>
      <button onClick={() => deleteQuestion(index)} className="button-x">
        <BsXLg color="black" size="18" className="icon-x" />
      </button>
    </div>
  );
}

export default Questions;
