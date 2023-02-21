const model = require("../Model/answeringModel");

const getAllAnswerings = () => {
  return new Promise((resolve, reject) => {
    model.find({}, (err, answerings) => {
      if (err) {
        reject(err);
      } else {
        resolve(answerings);
      }
    });
  });
};

const getAnsweringById = (id) => {
  return new Promise((resolve, reject) => {
    model.findById(id, (err, answering) => {
      if (err) {
        reject(err);
      } else {
        resolve(answering);
      }
    });
  });
};

const createAnswering = (answering) => {
  return new Promise((resolve, reject) => {
    const newAnswering = new model(answering);
    newAnswering.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Added successfully");
      }
    });
  });
};

const updateAnswering = async (id, answering) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(id, answering, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Updated successfully");
      }
    });
  });
};

const deleteAnswering = (id) => {
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

const deleteFromAllAnswering = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const answerings = await getAllAnswerings();
      answerings.map(async (answering) => {
        let i,
          answering_id = answering._id;
        if (
          answering.replied.some((surveyId, index) => {
            i = index;
            return surveyId.toString() === id;
          })
        ) {
          const newAnswering = {
            replied: answering.replied
              .slice(0, i)
              .concat(answering.replied.slice(i + 1)),
          };
          await updateAnswering(answering_id, newAnswering);
        }
      });
      resolve("Deleted successfully");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  getAllAnswerings,
  getAnsweringById,
  createAnswering,
  updateAnswering,
  deleteAnswering,
  deleteFromAllAnswering,
};
