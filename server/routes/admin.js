const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

router.get("/dashboard", adminController.dashboard_get);

router.get("/logout", adminController.logout_get);

module.exports = router;
