const asyncHandler = require("express-async-handler");

const Post = require("../models/post");

exports.tagList_get = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({}, ["tags", "formattedTags"]);
  const tagList = posts.reduce((tags, post) => {
    return tags.concat(post.tags);
  }, []);

  const uniqueTags = Array.from(new Set(tagList));
  uniqueTags.sort();

  const formattedTagList = Array.from(
    new Set(posts.flatMap((post) => post.formattedTags))
  );
  formattedTagList.sort();

  res.json({ reguralTags: uniqueTags, formattedTags: formattedTagList });
});

exports.tag_get = asyncHandler(async (req, res, next) => {
  const tag = req.params.tag;

  const posts = await Post.find({ tags: tag });

  if (!posts || posts.length === 0) {
    return res.status(404).json({ message: "No posts found with this tag." });
  }

  res.json(posts);
});

exports.postDetail_get = asyncHandler(async (req, res, next) => {
  const postTitle = req.params.postTitle;
  const post = await Post.findOne({ formattedTitle: postTitle });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});
