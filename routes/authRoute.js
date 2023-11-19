const express = require("express");

const passport = require("../config/passport");

const { loginWithGoogle } = require("../controllers/authController");
const { completeLogin, adminLogin } = require("../controllers/authController");

const {
  validateCompleteLogin,
  validateAdminLogin,
} = require("../middleware/validationMiddleware");
const { authenticateUser } = require("../middleware/authenticateUser");

const router = express.Router();

// router.post("/login", validateUserLogin, userLogin);

router.post("/admin-login", validateAdminLogin, adminLogin);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/protected-page", //Once the user successfully logged in he will be redirected to this user
    failureRedirect: "/", // If fails it will redirect to this
  }),
  loginWithGoogle
);

router.post(
  "/complete-login",
  validateCompleteLogin,
  authenticateUser,
  completeLogin
);

module.exports = router;
