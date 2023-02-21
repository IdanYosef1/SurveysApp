const initialState = {
  currentSurvey: {},
  answering: {},
  userId: "",
  token: "",
  isAuthenticated: false,
  bool: false,
  fillOut: true,
};

const applyChanges = (state = initialState, action) => {
  switch (action.type) {
    case "UpdateSurvey":
      return { ...state, currentSurvey: action.payload };
    case "UpdateId":
      return { ...state, userId: action.payload };
    case "UpdateToken":
      return { ...state, token: action.payload };
    case "UpdateAnswering":
      return { ...state, answering: action.payload };
    case "UpdateAuthenticated":
      return { ...state, isAuthenticated: action.payload };
    case "UpdateBool":
      return { ...state, bool: action.payload };
    case "updateFillOut":
      return { ...state, fillOut: action.payload };
    default:
      return state;
  }
};

export default applyChanges;
