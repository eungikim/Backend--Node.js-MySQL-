const express = require("express");

const { sign } = require("../controllers/authController");
const {
  completeLogin,
  adminLogin,
  resetPassword,
  updatePassword,
} = require("../controllers/authController");

const {
  validateCompleteLogin,
  validateAdminLogin,
} = require("../middleware/validationMiddleware");
const { authenticateUser } = require("../middleware/authenticateUser");

const router = express.Router();

router.post("/admin-login", validateAdminLogin, adminLogin);

// Reset password

router.post("/reset-password", resetPassword);

router.post("/update-password", updatePassword);

router.post("/sign", sign);

router.post(
  "/complete-register",
  validateCompleteLogin,
  authenticateUser,
  completeLogin
);

module.exports = router;
