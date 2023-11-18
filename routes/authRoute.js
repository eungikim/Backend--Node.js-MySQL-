const express = require("express");

const passport = require("../config/passport");

const { loginWithGoogle } = require("../controllers/authController");

const { validateUserLogin } = require("../middleware/validationMiddleware");

const router = express.Router();

// router.post("/login", validateUserLogin, userLogin);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: "/protected-page", //Once the user successfully logged in he will be redirected to this user
    failureRedirect: "/", // If fails it will redirect to this
  }),
  loginWithGoogle
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

module.exports = router;
