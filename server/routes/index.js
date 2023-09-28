const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const postController = require("../controllers/postController");

router.get("/blog", postController.postList_get);

router.post("/login", userController.login_post);

router.post("/signup", userController.createUser_post);

router.get("/search", postController.search_post);

router.get("/:postTitle", postController.postDetail_get);

router.post("/:postId/new-comment", postController.newComment_post);

module.exports = router;
