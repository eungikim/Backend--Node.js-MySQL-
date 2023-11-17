const path = require("path");

const express = require("express");

const { userLogin } = require("../controllers/authController");

const { validateUserLogin } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/login", validateUserLogin, userLogin);

module.exports = router;
