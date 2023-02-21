const updateSurvey = (obj) => {
  return {
    type: "UpdateSurvey",
    payload: obj,
  };
};

const updateId = (obj) => {
  return {
    type: "UpdateId",
    payload: obj,
  };
};

const updateToken = (token) => {
  return {
    type: "UpdateToken",
    payload: token,
  };
};

const updateAnswering = (obj) => {
  return {
    type: "UpdateAnswering",
    payload: obj,
  };
};

const updateAuthenticated = (isAuthenticated) => {
  return {
    type: "UpdateAuthenticated",
    payload: isAuthenticated,
  };
};

const updateBool = (bool) => {
  return {
    type: "UpdateBool",
    payload: bool,
  };
};

const updateFillOut = (bool) => {
  return {
    type: "UpdateFillOut",
    payload: bool,
  };
};

export {
  updateSurvey,
  updateId,
  updateToken,
  updateAnswering,
  updateAuthenticated,
  updateBool,
  updateFillOut,
};
