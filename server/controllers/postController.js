const asyncHandler = require("express-async-handler");

const Post = require("../models/post");

exports.postDetail_get = asyncHandler(async (req, res, next) => {
  const postTitle = req.params.postTitle;
  const post = await Post.findOne({ formattedTitle: postTitle });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});
