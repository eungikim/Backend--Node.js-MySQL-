const path = require("path");

const express = require("express");

const {
  validateExerciseAdding,
  validateMissionAdding,
  validateNoticeAdding,
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
  addMission,
  getAllMission,
  getOneMission,
  updateMission,
  deleteMission,
  getAllParticipantUsers,
  addNotice,
  getAllNotices,
  deleteNotice,
  getAllQuestions,
  getOneQuestion,
  giveAnswer,
} = require("../controllers/adminController");

const {
  resetPassword,
  updatePassword,
} = require("../controllers/authController");

const router = express.Router();

// Routes relating to admin-to-exercise

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

router.post("/exercise", validateExerciseAdding, addExercise);

router.delete("/exercise/:exercise_id", deleteExercise);

router.patch("/exercise/:exercise_id", updateExercise);

// Routes relating to admin-to-user

router.get("/users", getAllUsers);

router.get("/user/:user_id", getOneUser);

router.get("/user/exercises/:user_id", getUserExercises);

router.get("/user/:user_id/exercise/:exercise_id/", getOneUserExercise);

// Routes relating to missions

router.get("/missions", getAllMission);

router.get("/mission/:mission_id", getOneMission);

router.post("/mission", validateMissionAdding, addMission);

router.patch("/mission/:mission_id", updateMission);

router.delete("/mission/:mission_id", deleteMission);

router.get("/mission/:mission_id/users", getAllParticipantUsers);

// Routes relating to notices

router.post("/notice", validateNoticeAdding, addNotice);

router.get("/notices", getAllNotices);

router.delete("/notice/:notice_id", deleteNotice);

// Routes relating to 1:1

router.get("/questions", getAllQuestions);

router.get("/question/:question_id", getOneQuestion);

router.put("/question/:question_id", giveAnswer);

module.exports = router;
