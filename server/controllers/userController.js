const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");

exports.postList_get = asyncHandler(async (req, res, next) => {
  const postList = await Post.find({}, "title timestamp")
    .sort({ timestamp: 1 })
    .exec();

  res.json(postList);
});

exports.about_get = (req, res, next) => {
  res.status(200);
};

exports.createUser_post = asyncHandler(async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(`${req.body.password}`, 10);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    admin: req.body.admin,
  });

  const result = await user.save();
  res.json({ message: "User created successfully", user: result });
});

exports.login_get = (req, res, next) => {
  res.status(200);
};

exports.login_post = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });

  res.json({ message: "Logged in successfully", token });
};

exports.postDetail_get = asyncHandler(async (req, res, next) => {
  const postTitle = req.params.postTitle;
  const post = await Post.findOne({ formattedTitle: postTitle });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});
