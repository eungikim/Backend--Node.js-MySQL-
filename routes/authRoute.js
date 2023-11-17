const path = require("path");

const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.post("/login", authController.userLogin);

module.exports = router;
