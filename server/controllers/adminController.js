const asyncHandler = require("express-async-handler");
const Post = require("../models/post");
const Comment = require("../models/comment");
const User = require("../models/user");

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

  await newPost.save();

  res.json({ message: "New post created" });
});

exports.editPost_get = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const currentPost = await Post.findById(postId);

  res.json({ currentPost });
});

exports.editPost_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const currentPost = await Post.findById(postId);

  if (!currentPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  currentPost.title = req.body.title;
  currentPost.formattedTitle = req.body.title
    .replace(/\s+/g, "-")
    .toLowerCase();
  currentPost.body = req.body.body;
  currentPost.tags = req.body.tags;
  currentPost.formattedTags = req.body.tags.map((tag) =>
    tag.replace(/\s+/g, "-").toLowerCase()
  );

  await currentPost.save();

  res.json({ message: "Post changes saved" });
});

exports.deletePost_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  await Post.deleteOne({ _id: postId });
  await Comment.deleteMany({ postId: postId });

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

  res.json({ message: "Post publicity updated" });
});

exports.refreshToken_post = async (req, res, next) => {
  const { refreshToken } = req.body;

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("refresh_token", refreshToken, { httpOnly: true });
  res.json({ token });
};
