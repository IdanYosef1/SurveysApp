const model = require("../Model/surveysModel");

const getAllSurveys = () => {
  return new Promise((resolve, reject) => {
    model.find({}, (err, Surveys) => {
      if (err) {
        reject(err);
      } else {
        resolve(Surveys);
      }
    });
  });
};

const getSurveyById = (id) => {
  return new Promise((resolve, reject) => {
    model.findById(id, (err, Survey) => {
      if (err) {
        reject(err);
      } else {
        resolve(Survey);
      }
    });
  });
};

const createSurvey = (Survey) => {
  return new Promise((resolve, reject) => {
    const newSurvey = new model(Survey);
    newSurvey.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Added successfully");
      }
    });
  });
};

const updateSurvey = async (id, survey) => {
  const obj = {
    ...survey,
    numOfParticipants: survey.numOfParticipants + 1,
  };
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(id, obj, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Updated successfully");
      }
    });
  });
};

const deleteSurvey = (id) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndDelete(id, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted successfully");
      }
    });
  });
};

module.exports = {
  getAllSurveys,
  getSurveyById,
  createSurvey,
  updateSurvey,
  deleteSurvey,
};
