const bcrypt = require("bcryptjs");
const passport = require("passport");

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

exports.loginPost = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/",
});

exports.logoutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
