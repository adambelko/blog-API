const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.get("/", postController.tagList_get);

router.get("/:tag", postController.postByTag_get);

module.exports = router;
