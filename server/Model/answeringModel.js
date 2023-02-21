const mongoose = require("mongoose");
const schema = mongoose.Schema;

const answeringsScema = new schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  replied: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("answerings", answeringsScema);
