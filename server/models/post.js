const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  formattedTitle: { type: String },
  body: { type: String, required: true },
  timestamp: { type: Date, default: Date.now(), required: true },
});

PostSchema.virtual("url").get(function () {
  return `/${formattedTitle}`;
});

module.exports = mongoose.model("Message", PostSchema);
