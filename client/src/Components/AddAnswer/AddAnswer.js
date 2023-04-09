import { AiFillDelete } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiQuestionAnswerLine } from "react-icons/ri";

function AddAnswer({ objAnswer, edit, deleteAnswer }) {
  return (
    <div className="div-add-answers">
      <div className="div-add-QuestionAnswer">
        <RiQuestionAnswerLine className="line-addSurvey" />
      </div>
      <span className="span-answer">{objAnswer.answer}</span>
      <div className="div-buttons-answers">
        <button
          className="button-delete"
          id={objAnswer.id}
          value={objAnswer.id}
          onClick={() => edit(objAnswer.id, objAnswer.answer)}
        >
          {" "}
          <BiEditAlt className="icon-edit" color="white" />{" "}
        </button>
        <button
          className="button-delete"
          id={objAnswer.id}
          value={objAnswer.id}
          onClick={() => deleteAnswer(objAnswer.id)}
        >
          {" "}
          <AiFillDelete className="icon-delete" color="white" />{" "}
        </button>
      </div>
    </div>
  );
}

export default AddAnswer;
