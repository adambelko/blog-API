const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: Schema.Types.ObjectId, ref: "User", required: true },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Message", CommentSchema);
