const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Not implemented");
});

router.get("/about", (req, res, next) => {
  return res.json("Not implemented");
});

router.get("/login", (req, res, next) => {
  return res.json("Not implemented");
});

router.post("/login", (req, res, next) => {
  return res.json("Not implemented");
});

router.get("/signup", (req, res, next) => {
  return res.json("Not implemented");
});

router.post("/signup", (req, res, next) => {
  return res.json("Not implemented");
});

module.exports = router;
