function FormNewQuestion({ newQuestion, setData, questionAnswer }) {
  return (
    <form onSubmit={newQuestion}>
      <input
        type="text"
        name="question"
        value={questionAnswer.question}
        onChange={setData}
        required
        className="input-question"
        placeholder="Question"
      />{" "}
      ?
      <button type="submit" className="button-saveAndNew">
        Save and new question
      </button>
    </form>
  );
}

export default FormNewQuestion;
