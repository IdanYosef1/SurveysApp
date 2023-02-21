function FormPostSurvey({
  postSurvey,
  isSuccess,
  successClass,
  setData,
  questionAnswer,
}) {
  const showSuccess = isSuccess ? (
    <div className={successClass}>{isSuccess}</div>
  ) : null;

  return (
    <form onSubmit={postSurvey}>
      {showSuccess}
      <button type="submit" className="button-postSurvey">
        Post survey
      </button>{" "}
      <br /> <br />
      <input
        type="text"
        name="survey"
        maxLength={32}
        onChange={setData}
        required
        className="surveyTitle"
        placeholder="Survey Title"
        value={questionAnswer.survey}
      />{" "}
      <div className="float-right position-relative">
        <input
          type="datetime-local"
          name="expiredDate"
          value={questionAnswer.expiredDate}
          min={
            new Date().toISOString().slice(0, 11) +
            new Date().toLocaleTimeString().slice(0, 5)
          }
          onChange={setData}
          required
          className="input-date"
        />
        <span className="floating-label">Expired date</span>
      </div>
      <br />
    </form>
  );
}

export default FormPostSurvey;
