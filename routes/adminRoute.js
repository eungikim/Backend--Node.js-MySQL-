const path = require("path");

const express = require("express");

const {
  validateExerciseAdding,
} = require("../middleware/validationMiddleware");

const {
  adminLogin,
  getAllExercises,
  getOneExercise,
  addExercise,
  deleteExercise,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/login", adminLogin);

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

router.post("/exercise", validateExerciseAdding, addExercise);

router.delete("/exercise/:exercise_id", deleteExercise);

module.exports = router;
