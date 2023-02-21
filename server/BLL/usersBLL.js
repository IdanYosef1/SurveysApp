const model = require("../Model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    model.find({}, (err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    model.findById(id, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
};

const login = (obj) => {
  return new Promise((resolve, reject) => {
    const { email, password } = obj;
    model.find({ email }).then((users) => {
      if (users.length === 0) {
        resolve(false);
      } else {
        const [user] = users;
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            const token = jwt.sign(
              {
                id: user._id,
                email: user.email,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "1H",
              }
            );
            resolve({ userId: user._id, token });
          }
          resolve(false);
        });
      }
    });
  });
};

const createUser = (user) => {
  return new Promise((resolve, reject) => {
    const { username, email, password, phone } = user;

    model
      .find({
        $or: [{ email: email }, { username: username }, { phone: phone }],
      })
      .then((users) => {
        if (users.length >= 1) {
          resolve("Username or email or phone exists");
        }
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            reject(error);
          }
          const newUser = new model({
            ...user,
            password: hash,
          });

          newUser.save((err) => {
            if (err) {
              reject(err);
            } else {
              resolve(newUser);
            }
          });
        });
      });
  });
};

const updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(id, user, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Updated successfully");
      }
    });
  });
};

const updateRequests = (id, request) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      id,
      { $addToSet: { requestStatus: request } },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Updated successfully");
        }
      }
    );
  });
};

const updateManager = (id, survey) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate(
      "62d31604f7fd43721f01ea6f",
      { $addToSet: { awaitingApproval: survey } },
      { new: true },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
};

const deleteUser = (id) => {
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

const deleteFromArray = (userId, surveyId) => {
  return new Promise((resolve, reject) => {
    model.updateOne(
      { _id: userId },
      { $pull: { awaitingApproval: { _id: surveyId } } },
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Deleted successfully");
        }
      }
    );
  });
};

const deleteRequest = (userId, statusesId) => {
  return new Promise((resolve, reject) => {
    model.updateMany(
      {
        _id: userId,
      },
      {
        $pull: {
          requestStatus: {
            _id: {
              $in: statusesId,
            },
          },
        },
      },
      {
        multi: true,
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteAllStatus = (userId) => {
  return new Promise((resolve, reject) => {
    model.updateOne(
      { _id: userId },
      {
        $set: {
          requestStatus: [],
        },
      },
      { multi: true },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const updateStatus = (surveyname, update) => {
  return new Promise((resolve, reject) => {
    model.updateOne(
      { "requestStatus.surveyname": surveyname },
      {
        $set: {
          "requestStatus.$.requestStatus": update,
        },
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateRequests,
  updateManager,
  deleteFromArray,
  deleteRequest,
  deleteAllStatus,
  updateStatus,
  login,
};
