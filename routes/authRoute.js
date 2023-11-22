const express = require("express");

const passport = require("../config/passport");

const { sign } = require("../controllers/authController");
const { completeLogin, adminLogin } = require("../controllers/authController");

const {
  validateCompleteLogin,
  validateAdminLogin,
} = require("../middleware/validationMiddleware");
const { authenticateUser } = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/admin-login", validateAdminLogin, adminLogin);

router.post("/sign", sign);

router.post(
  "/complete-register",
  validateCompleteLogin,
  authenticateUser,
  completeLogin
);

module.exports = router;
