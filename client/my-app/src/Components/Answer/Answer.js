function Answer({ index, obj, setCheckBox }) {
  return (
    <div key={index} className="div-answer">
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
