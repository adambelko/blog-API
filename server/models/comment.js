const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String },
  website: { type: String },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now(), required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
