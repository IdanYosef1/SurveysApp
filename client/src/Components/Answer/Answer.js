function Answer({ obj, setCheckBox }) {
  return (
    <div key={obj._id} className="div-answer">
      <input
        type="radio"
        className="radio"
        name={obj.answer}
        onClick={setCheckBox}
      />
      <label className="label-answer">{obj.answer}</label>
    </div>
  );
}

export default Answer;
