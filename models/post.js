const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now(), required: true },
});

module.exports = mongoose.model("Message", PostSchema);
