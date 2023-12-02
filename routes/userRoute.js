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

// My exercise

// Enroll exercise
router.post(
  "/exercise/:exercise_id",
  validateExerciseEnrolling,
  addUserExercise
);

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

router.post("/report/:exercise_id/", validateSendingReport, sendReport);

//User Mission

router.get("/missions/all", getAllMission);

router.get("/mission/:mission_id", getOneMission);

// my mission

router.post("/mission/:mission_id", addUserMission);

router.get("/my_missions", getUserMissions);

router.get("/my_missions/:mission_id", getOneUseMission);

// get reward

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

// 1:1 inquiries

router.post("/question/ask", askQuestion);

router.get("/questions/see-answers", seeAnswers);

module.exports = router;
