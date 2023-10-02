const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// exports.createUser_post = asyncHandler(async (req, res, next) => {
//   const hashedPassword = await bcrypt.hash(`${req.body.password}`, 10);

//   const user = new User({
//     username: req.body.username,
//     password: hashedPassword,
//     admin: req.body.admin,
//   });

//   const result = await user.save();
//   res.json({ message: "User created successfully", user: result });
// });

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

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_ACCESS_TOKEN_SECRET
  );

  const refreshToken = jwt.sign(
    { username: user.username },
    process.env.JWT_REFRESH_TOKEN_SECRET
  );

  user.refreshToken = refreshToken;

  await user.save();

  res.cookie("access_token", token, { httpOnly: true });
  res.json({ token, refreshToken });
};
