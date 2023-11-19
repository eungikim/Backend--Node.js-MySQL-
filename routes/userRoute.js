const express = require("express");

const router = express.Router();

const {
  getAllExercises,
  getOneExercise,
  addUserExercise,
  getUserExercises,
  getOneUserExercise,
  sendReport,
} = require("../controllers/userController");
const { validateSendingReport } = require("../middleware/validationMiddleware");

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

router.post("/exercise/:exercise_id", addUserExercise);

router.get("/my-exercises", getUserExercises);

router.get("/my-exercises/:exercise_id", getOneUserExercise);

router.post("/report/:exercise_id", validateSendingReport, sendReport);

module.exports = router;
