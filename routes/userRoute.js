const express = require("express");

const router = express.Router();

const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

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
  updateProfileImage,
  askQuestion,
  seeAnswers,
  seeAnswer,
  postOneRM,
  getAllMyRM,
  getTotalUserAverage,
  getSameGenderAverage,
} = require("../controllers/userController");

const {
  getAllMission,
  getOneMission,
  getAllNotices,
} = require("../controllers/adminController");

const {
  validateSendingReport,
  validateExerciseAdding,
  validateExerciseEnrolling,
} = require("../middleware/validationMiddleware");
const { route } = require("./adminRoute");

router.get("/exercises", getAllExercises);

router.get("/exercise/:exercise_id", getOneExercise);

//  ###########################   My exercise ############################### //

// Enroll exercise
router.post(
  "/exercise/:exercise_id",
  validateExerciseEnrolling,
  addUserExercise
);

// Get all my enrolled exercises
router.get("/my-exercises", getUserExercises);

// get my exercises for this week
router.get("/my-exercise/week-exercises", getWeekExercise);

//get by my exercises by date
router.get("/my-exercise/:year/:month/:day", getByDate);

// get my today's exercises
router.get("/my-exercise/today-exercises", getTodayExercises);

// get one of my enrolled exercise
router.get("/my-exercise/:exercise_id", getOneUserExercise);

// send a report
router.post("/report/:exercise_id/", validateSendingReport, sendReport);

//  ###########################   My missions ############################### //

// Get all missions
router.get("/missions/all", getAllMission);

// Get one mission
router.get("/mission/:mission_id", getOneMission);

// Enroll mission
router.post("/mission/:mission_id", addUserMission);

// Get all my enrolled missions
router.get("/my_missions", getUserMissions);

// Get one of my enrolled mission
router.get("/my_missions/:mission_id", getOneUseMission);

// Get reward after completion of a mission
router.get("/get-reward/:mission_id", getReward);

// Get all notices
router.get("/notices", getAllNotices);

// ################### Update Profile ########################### //

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "moty-bucket",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const filename = `${req.userId}-profile-image.jpg`;
      console.log(filename);
      cb(null, filename);
    },
  }),
});

router.post("/update-profile", upload.single("image"), updateProfileImage);

// ################### 1:1 inquiries ########################### //

// Ask a question
router.post("/question/ask", askQuestion);

// See the answers for all my questions
router.get("/questions/see-answers", seeAnswers);

// See one question with its answer
router.get("/questions/see-answer/:question_id", seeAnswer);

// ###################  My part of body data ########################### //

// post one RM
router.post("/exercise-part", postOneRM);

// // Get one RM
router.get("/exercise-part", getAllMyRM);

// // Get all users average RM
router.get("/exercise-part/total-user-average", getTotalUserAverage);

// // Get same gender average
router.get("/exercise-part/same-gender-average", getSameGenderAverage);

module.exports = router;
