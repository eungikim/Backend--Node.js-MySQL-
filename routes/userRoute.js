const express = require("express");

const router = express.Router();

const {
  getAllExercises,
  getOneExercise,
  addUserExercise,
  getUserExercises,
  getOneUserExercise,
} = require("../controllers/userController");

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

router.post("/exercise/:exercise_id", addUserExercise);

router.get("/my-exercises", getUserExercises);

router.get("/my-exercises/:exercise_id", getOneUserExercise);

module.exports = router;
