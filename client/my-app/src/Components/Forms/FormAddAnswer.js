import { AiOutlineCheck } from "react-icons/ai";

function FormAddAnswer({ addAnswer, setData, questionAnswer }) {
  return (
    <form onSubmit={addAnswer}>
      <input
        type="text"
        name="answer"
        value={questionAnswer.answer}
        onChange={setData}
        required
        className="input-question"
        placeholder="Answer"
      />{" "}
      <button type="submit" className="button-check">
        <AiOutlineCheck />
      </button>
    </form>
  );
}

export default FormAddAnswer;
