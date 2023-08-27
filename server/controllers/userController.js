const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.newUserPost = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(`${req.body.password}`, 10);

    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      admin: req.body.admin,
    });

    const result = await user.save();
    res.json({ message: "User created successfully", user: result });
  } catch (err) {
    return next(err);
  }
};

exports.loginGet = (req, res, next) => {
  res.render("log_in");
};

exports.loginPost = async (req, res, next) => {
  try {
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
      process.env.JWT_SECRET,
      {
        expiresIn: "3h",
      }
    );

    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    console.log(err);
  }
};

exports.protectedPost = (req, res) => {
  res.send("You have accessed a protected route!");
};

exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
