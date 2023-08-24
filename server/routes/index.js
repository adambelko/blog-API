const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res, next) => {
  res.json("Not implemented");
});

router.post("/signup", userController.newUserPost);

router.post("/login", userController.loginPost);

router.get("/logout", userController.logoutGet);

module.exports = router;
