import { AiOutlineCheck } from "react-icons/ai";

function FormEditAnswer({ changeAnswer, setData, currentAnswer }) {
  return (
    <form onSubmit={changeAnswer}>
      <input
        type="text"
        name="edit"
        value={currentAnswer}
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

export default FormEditAnswer;
