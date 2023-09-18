const asyncHandler = require("express-async-handler");

const Post = require("../models/post");
const Comment = require("../models/comment");

exports.postList_get = asyncHandler(async (req, res, next) => {
  const postList = await Post.find({}).sort({ timestamp: -1 }).exec();

  res.json({ postList });
});

exports.tagList_get = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}, ["tags"]);
  const tagList = posts.reduce((tags, post) => {
    return tags.concat(post.tags);
  }, []);

  const uniqueTags = Array.from(new Set(tagList));
  uniqueTags.sort((a, b) => a.localeCompare(b));

  res.json({ tagList: uniqueTags });
});

exports.tag_get = asyncHandler(async (req, res, next) => {
  const tag = req.params.tag;

  const postList = await Post.find({ formattedTags: tag });

  if (!postList || postList.length === 0) {
    return res.status(404).json({ message: "No posts found with this tag." });
  }

  res.json({ postList });
});

exports.search_post = asyncHandler(async (req, res, next) => {
  const query = req.query.query;

  const results = await Post.find({
    title: { $regex: query, $options: "i" },
  })
    .sort({ timestamp: -1 })
    .exec();

  res.json({ results });
});

exports.postDetail_get = asyncHandler(async (req, res, next) => {
  const postTitle = req.params.postTitle;
  const post = await Post.findOne({ formattedTitle: postTitle });

  const postComments = await Comment.find({ postId: post._id });
  post.comments = postComments;

  await post.populate("comments");

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ post });
});

exports.newComment_post = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;

  const newComment = new Comment({
    username: req.body.username,
    email: req.body.email,
    website: req.body.website,
    body: req.body.body,
    timestamp: Date.now(),
    postId: postId,
  });

  await newComment.save();

  res.json({});
});
