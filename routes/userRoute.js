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
  getByDate,
  getMonthExercise,
  getTodayExercises,
  getReward,
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

// // get this month(last 30 days)
// router.get("/my-exercise/month-exercises", getMonthExercise);

// get my exercise for this week
router.get("/my-exercise/week-exercises", getWeekExercise);

//get by my exercise by date
router.get("/my-exercise/:year/:month/:day", getByDate);

// get my today's exercises
router.get("/my-exercise/today-exercises", getTodayExercises);

router.get("/my-exercise/:exercise_id", getOneUserExercise);

router.post("/report/:exercise_id", validateSendingReport, sendReport);

//User Mission

router.get("/missions/all", getAllMission);

router.get("/mission/:mission_id", getOneMission);

// my mission

router.post("/mission/:mission_id", addUserMission);

router.get("/my_missions", getUserMissions);

router.get("/my_missions/:mission_id", getOneUseMission);

// get reward

router.get("/get-reward/:mission_id", getReward);

module.exports = router;
