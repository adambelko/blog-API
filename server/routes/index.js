const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.postList_get);

router.get("/about", userController.about_get);

router.post("/signup", userController.createUser_post);

router.get("/login", userController.login_get);

router.post("/login", userController.login_post);

router.get("/:postTitle", userController.postDetail_get);

module.exports = router;
