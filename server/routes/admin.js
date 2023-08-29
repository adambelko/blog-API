const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.dashboard_get);

router.get("/logout", adminController.logout_get);

router.get("/new-post", adminController.newPost_get);

router.get("/new-post", adminController.newPost_post);

router.get("/:postTitle/edit-post", adminController.editPost_get);

router.get("/:postTitle/edit-post", adminController.editPost_post);

router.get("/:postTitle/delete-post", adminController.deletePost_post);

router.get(
  "/:postTitle/change-post-publicity",
  adminController.changePostPublicity_post
);

module.exports = router;
