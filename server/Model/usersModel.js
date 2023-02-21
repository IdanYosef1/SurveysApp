const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usersScema = new schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  age: { type: Number, min: 0, required: true },
  phone: {
    type: String,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
    unique: true,
    required: true,
  },
  email: { type: String, unique: true, required: true },
  awaitingApproval: [
    {
      surveyname: { type: String, required: true },
      creatorId: { type: mongoose.Schema.Types.ObjectId, required: true },
      numOfQuestions: { type: Number, required: true },
      numOfParticipants: { type: Number, required: true },
      uploadDate: { type: Date, required: true },
      expiredDate: { type: Date, required: true },
      questions: [
        {
          question: { type: String, required: true },
          answers: [
            {
              answer: { type: String, required: true },
              votes: { type: Number, required: true },
            },
          ],
        },
      ],
    },
  ],
  requestStatus: [
    {
      surveyname: { type: String, required: true },
      uploadDate: { type: Date, required: true },
      requestStatus: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("users", usersScema);
