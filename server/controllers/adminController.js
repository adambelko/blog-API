const asyncHandler = require("express-async-handler");
const Post = require("../models/post");

exports.dashboard_get = (req, res, next) => {
  res.send("Admin dashboard");
};

exports.newPost_get = (req, res, next) => {
  res.send("New post page");
};

exports.newPost_post = asyncHandler(async (req, res, next) => {
  const newPost = new Post({
    title: req.body.title,
    formattedTitle: req.body.title.replace(/\s+/g, "-").toLowerCase(),
    body: req.body.body,
    published: req.body.published,
    tags: req.body.tags,
    formattedTags: req.body.tags.map((tag) =>
      tag.replace(/\s+/g, "-").toLowerCase()
    ),
    timestamp: Date.now(),
  });

  newPost.save();
  res.send("New post created");
});

exports.editPost_get = (req, res, next) => {
  res.send("Edit post page");
};

exports.editPost_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const editPostData = {
    title: req.body.title,
    formattedTitle: req.body.title.replace(/\s+/g, "-").toLowerCase(),
    body: req.body.body,
    published: req.body.published,
  };

  await Post.updateOne({ _id: postId }, editPostData);

  res.json({ message: "Post editted successfully" });
});

exports.deletePost_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  await Post.deleteOne({ _id: postId });

  res.json({ message: "Post deleted successfully" });
});

exports.changePostPublicity_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const currentPost = await Post.findById(postId);

  if (!currentPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  currentPost.published = !currentPost.published;

  await currentPost.save();

  res.status(200);
});
