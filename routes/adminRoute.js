const path = require("path");

const express = require("express");

const {
  validateExerciseAdding,
} = require("../middleware/validationMiddleware");

const {
  getAllExercises,
  getOneExercise,
  addExercise,
  deleteExercise,
  updateExercise,
  getAllUsers,
  getOneUser,
  getUserExercises,
  getOneUserExercise,
} = require("../controllers/adminController");

const router = express.Router();

// Routes relating to admin-to-exercise

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

router.post("/exercise", addExercise);

router.delete("/exercise/:exercise_id", deleteExercise);

router.patch("/exercise/:exercise_id", updateExercise);

// Routes relating to admin-to-user

router.get("/users", getAllUsers);

router.get("/user/:user_id", getOneUser);

router.get("/user/exercises/:user_id", getUserExercises);

router.get("/user/:user_id/exercise/:exercise_id/", getOneUserExercise);

module.exports = router;
