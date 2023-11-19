const express = require("express");

const router = express.Router();

const {
  getAllExercises,
  getOneExercise,
  addUserExercise,
} = require("../controllers/userController");

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

router.post("/exercise", addUserExercise);

module.exports = router;
