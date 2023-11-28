const express = require("express");

const router = express.Router();

const {
  getAllExercises,
  getOneExercise,
  addUserExercise,
  getUserExercises,
  getOneUserExercise,
  sendReport,
  getUserMissions,
  addUserMission,
  getOneUseMission,
  getWeekExercise,
} = require("../controllers/userController");

const {
  getAllMission,
  getOneMission,
} = require("../controllers/adminController");

const { validateSendingReport } = require("../middleware/validationMiddleware");
const { route } = require("./adminRoute");

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

// My exercise

router.post("/exercise/:exercise_id", addUserExercise);

router.get("/my-exercises", getUserExercises);

router.get("/my-exercise/week-exercises", getWeekExercise);

router.get("/my-exercise/:exercise_id", getOneUserExercise);

router.post("/report/:exercise_id", validateSendingReport, sendReport);

//User Mission

router.get("/missions/all", getAllMission);

router.get("/mission/:mission_id", getOneMission);

// my mission

router.post("/mission/:mission_id", addUserMission);

router.get("/my_missions", getUserMissions);

router.get("/my_missions/:mission_id", getOneUseMission);

module.exports = router;
