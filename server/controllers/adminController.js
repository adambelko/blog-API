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
    formattedTitle: this.title.replace(/\s+/g, "-").toLowerCase(),
    body: req.body.body,
    timestamp: Date.now(),
  });

  newPost.save();
});

exports.logout_get = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
