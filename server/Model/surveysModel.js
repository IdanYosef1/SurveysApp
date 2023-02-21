const mongoose = require("mongoose");
const schema = mongoose.Schema;

const surveysScema = new schema({
  surveyname: { type: String, maxlength: 32, required: true },
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
});

module.exports = mongoose.model("surveys", surveysScema);
