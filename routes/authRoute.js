const express = require("express");

const passport = require("../config/passport");

const { loginWithGoogle } = require("../controllers/authController");
const { completeLogin } = require("../controllers/authController");

const { validateCompleteLogin } = require("../middleware/validationMiddleware");
const { authenticateUser } = require("../middleware/currentUser");

const router = express.Router();

// router.post("/login", validateUserLogin, userLogin);

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
