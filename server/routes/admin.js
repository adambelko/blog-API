const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.post("/new-post", adminController.newPost_post);

router.get("/:postId/edit-post", adminController.editPost_get);

router.post("/:postId/edit-post", adminController.editPost_post);

router.post("/:postId/delete-post", adminController.deletePost_post);

router.post(
  "/:postId/change-post-publicity",
  adminController.changePostPublicity_post
);

router.post("/refresh-token", adminController.refreshToken_post);

module.exports = router;
