const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/userController");

router.get("/", (req, res, next) => {
  res.json("Not implemented");
});

router.post("/signup", userController.newUserPost);

router.post("/login", userController.loginPost);

router.post(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  userController.protectedPost
);

router.get("/logout", userController.logoutGet);

module.exports = router;
