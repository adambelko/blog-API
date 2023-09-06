const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

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

  res.redirect("http://localhost:3000/admin/dashboard");
};
