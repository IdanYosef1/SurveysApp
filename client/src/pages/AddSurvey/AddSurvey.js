import { useState } from "react";
import { createData, updateManager, updateRequests } from "../../axios";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import FormPostSurvey from "../../Components/Forms/FormPostSurvey";
import FormNewQuestion from "../../Components/Forms/FormNewQuestion";
import FormAddAnswer from "../../Components/Forms/FormAddAnswer";
import Questions from "../../Components/Questions/Questions";
import FormEditAnswer from "../../Components/Forms/FormEditAnswer";
import AddAnswer from "../../Components/AddAnswer/AddAnswer";

const urlUsers = process.env.REACT_APP_USERS_URL;
const urlSurveys = process.env.REACT_APP_SURVEYS_URL;

function AddSurvey() {
  const [questions, setQuestions] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState({
    survey: "",
    question: "",
    answer: "",
    expiredDate: "",
  });
  const [answers, setAnswers] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [successClass, setSuccessClass] = useState("");
  const [currentId, setcurrentId] = useState("");
  const store = useSelector((state) => state);

  const setData = (e) => {
    const { name, value } = e.target;
    if (name === "survey" && value.length >= 32) {
      setIsSuccess("The maximum number of characters is 32");
      setSuccessClass("failure");
    } else {
      setIsSuccess("");
      setSuccessClass("");
    }
    const obj = { ...questionAnswer };
    obj[name] = value ? value[0].toUpperCase() + value.slice(1) : value;
    name === "edit" ? setCurrentAnswer(value) : setQuestionAnswer(obj);
  };

  const addAnswer = (e) => {
    e.preventDefault();
    if (answers.length === 1) {
      setMessage("");
    }
    setQuestionAnswer({ ...questionAnswer, answer: "" });
    setAnswers([
      ...answers,
      { answer: questionAnswer.answer, id: nanoid(), votes: 0 },
    ]);
    setIsAdd(false);
  };

  const deleteAnswer = (answerId) => {
    if (answers.length === 5) {
      setMessage("");
    }
    const arr = [...answers];
    const index = arr.findIndex((answer) => answer.id === answerId);
    arr.splice(index, 1);
    setAnswers(arr);
  };

  const findQuestonAndUpdate = () => {
    const index = questions.findIndex((question) => question.id === currentId);
    if (index === -1) {
      setQuestions([
        ...questions,
        {
          id: nanoid(),
          question: questionAnswer.question + "?",
          answers: answers,
        },
      ]);
    } else {
      const quest = [...questions];
      quest[index].question = questionAnswer.question + "?";
      quest[index].answers = answers;
      setQuestions(quest);
    }
  };

  const newQuestion = (e) => {
    e.preventDefault();
    if (answers.length > 1) {
      findQuestonAndUpdate();
      setMessage("");
      setcurrentId("");
      setAnswers([]);
      setQuestionAnswer({ ...questionAnswer, question: "", answer: "" });
    } else {
      setMessage("Enter at least two answers");
    }
  };

  const wasCreationSuccess = (response, msg) => {
    if (response.status === 200) {
      setSuccessClass("success");
      setIsSuccess(msg);
      resetAll();
    } else {
      setIsSuccess("Survey creation failed");
      setSuccessClass("failure");
    }
  };

  const postOfAdmin = async (obj) => {
    try {
      const response = await createData(urlSurveys, obj, store.token);
      wasCreationSuccess(response, "The survey was successfully published");
    } catch (err) {
      console.log(err);
    }
  };

  const postOfUser = async (obj) => {
    try {
      const manager = (
        await updateManager(urlUsers, store.userId, obj, store.token)
      ).data;
      const response = await updateRequests(
        urlUsers,
        store.userId,
        {
          awaitingId:
            manager.awaitingApproval[manager.awaitingApproval.length - 1]._id,
          surveyname: obj.surveyname,
          uploadDate: obj.uploadDate,
          requestStatus: "pendingApproval",
        },
        store.token
      );
      wasCreationSuccess(
        response,
        "The request has been sent to the manager for approval"
      );
    } catch (err) {
      console.log(err);
    }
  };

  const isAdmin = async (obj) => {
    try {
      store.userId === "62d31604f7fd43721f01ea6f"
        ? await postOfAdmin(obj)
        : await postOfUser(obj);
    } catch (err) {
      console.log(err);
    }
  };

  const postSurvey = (e) => {
    e.preventDefault();
    if (questions.length > 0) {
      const obj = {
        surveyname: questionAnswer.survey,
        creatorId: store.userId,
        numOfQuestions: questions.length,
        numOfParticipants: 0,
        uploadDate: new Date(),
        expiredDate: new Date(questionAnswer.expiredDate),
        questions: questions,
      };
      isAdmin(obj);
    }
  };

  const resetAll = () => {
    setQuestionAnswer({
      survey: "",
      question: "",
      answer: "",
      expiredDate: "",
    });
    setAnswers([]);
    setQuestions([]);
    setcurrentId("");
  };

  const edit = (id, answer) => {
    setEditAnswer(id);
    setCurrentAnswer(answer);
  };

  const [editAnswer, setEditAnswer] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const changeAnswer = (e) => {
    e.preventDefault();
    if (answers.length === 1) {
      setMessage("");
    }
    setQuestionAnswer({ ...questionAnswer, answer: "" });
    const index = answers.findIndex((answer) => answer.id === editAnswer);
    const arr = [...answers];
    arr[index].answer = currentAnswer;
    setAnswers(arr);
    setEditAnswer(null);
  };

  const showAnswers = answers.map((objAnswer) => {
    return (
      <li key={objAnswer.id} className="li-addSurvey">
        {editAnswer !== objAnswer.id ? (
          <AddAnswer
            objAnswer={objAnswer}
            edit={edit}
            deleteAnswer={deleteAnswer}
          />
        ) : (
          <FormEditAnswer
            changeAnswer={changeAnswer}
            setData={setData}
            currentAnswer={currentAnswer}
          />
        )}
      </li>
    );
  });

  const changeDetails = (index) => {
    setQuestionAnswer({
      ...questionAnswer,
      question: questions[index].question.slice(
        0,
        questions[index].question.length - 1
      ),
      answer: "",
    });
    setAnswers(questions[index].answers);
    setcurrentId(questions[index].id);
  };

  const deleteQuestion = (index) => {
    const newArr = [...questions];
    newArr.splice(index, 1);
    setQuestions(newArr);
  };

  const showFormAddAnswer = isAdd ? (
    <FormAddAnswer
      addAnswer={addAnswer}
      setData={setData}
      questionAnswer={questionAnswer}
    />
  ) : null;

  const clickAddAnswer = () => {
    if (answers.length < 5) {
      setIsAdd(true);
      setMessage("");
    } else {
      setMessage("You can enter up to 5 answers");
    }
  };

  const showCancel = isAdd ? (
    <button className="button-cancel" onClick={() => setIsAdd(false)}>
      Cancel{" "}
    </button>
  ) : null;

  const showQuestions = questions.map((question, index) => (
    <Questions
      key={index}
      index={index}
      question={question}
      changeDetails={changeDetails}
      deleteQuestion={deleteQuestion}
    />
  ));

  return (
    <div className="div-addSurvey">
      <div className="questions">
        <h5 className="h5-addSurvey">Questions</h5>
        {showQuestions}
      </div>
      <div className="addSurvey">
        <h1 className="textAlign-center">Add Survey</h1> <br />
        <FormPostSurvey
          postSurvey={postSurvey}
          isSuccess={isSuccess}
          successClass={successClass}
          setData={setData}
          questionAnswer={questionAnswer}
        />
        <br />
        <br />
        <FormNewQuestion
          newQuestion={newQuestion}
          setData={setData}
          questionAnswer={questionAnswer}
        />
        <br />
        <ul className="ul-addSurvey">{showAnswers}</ul>
        {showFormAddAnswer}
        <br />
        <button
          className="button-addAnswer"
          onClick={clickAddAnswer}
          disabled={isAdd}
        >
          Add answer
        </button>{" "}
        {showCancel}
        <span className="message-addSurvey">{message}</span>
        <br />
      </div>
    </div>
  );
}

export default AddSurvey;
