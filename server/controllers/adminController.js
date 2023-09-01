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
    timestamp: Date.now(),
  });

  newPost.save();
  res.send("New post created");
});

exports.editPost_get = (req, res, next) => {
  res.send("Edit post page");
};

exports.editPost_post = asyncHandler(async (req, res, next) => {
  const editPostId = req.params.postId;

  const editPostData = {
    title: req.body.title,
    formattedTitle: req.body.title.replace(/\s+/g, "-").toLowerCase(),
    body: req.body.body,
    published: req.body.published,
  };

  const result = await Post.updateOne({ _id: editPostId }, editPostData);

  res.json({ message: "Post editted successfully" });
});

exports.deletePost_post = asyncHandler(async (req, res, next) => {
  const deletePost = req.params.postId;

  const result = await Post.deleteOne({ _id: deletePost });

  res.json({ message: "Post deleted successfully" });
});

exports.changePostPublicity_post = asyncHandler((req, res, next) => {
  res.send("publish / unpublish post not implemented yet");
});

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
