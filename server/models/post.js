const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true, unique: true },
  formattedTitle: { type: String },
  body: { type: String, required: true },
  published: { type: Boolean, default: false },
  tags: [{ type: String }],
  formattedTags: [{ type: String }],
  timestamp: { type: Date, default: Date.now(), required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Post", PostSchema);
