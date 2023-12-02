const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const UserExercise = require("../models/userExercise");
const Notice = require("../models/notice");
const Question = require("../models/question");

const Mission = require("../models/mission");
const UserMission = require("../models/userMission");

// Retrieve all exercises
exports.getAllExercises = async (req, res) => {
  const exercises = await Exercise.findAll();

  if (!exercises) {
    const error = new Error("No exercise is found");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ exercises: exercises });
};

// Retrieve one single exercise
exports.getOneExercise = async (req, res) => {
  const id = await req.params.exercise_id;
  const exercise = await Exercise.findOne({ where: { id: id } });

  if (!exercise) {
    const error = new Error("Exercise not found for the given id");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ exercise: exercise });
};

// Add exercise to the exercises list
exports.addExercise = async (req, res) => {
  try {
    const newExercise = await Exercise.create(req.body);

    res.status(StatusCodes.CREATED).json({
      message: "Exercise created successfully",
      newExercise: newExercise,
    });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error when adding exercise" });
  }
};

// Delete one exercise
exports.deleteExercise = async (req, res) => {
  const id = req.params.exercise_id;
  const exercise = await Exercise.findByPk(id);
  if (!exercise) {
    const error = new Error(
      "Exercise not found for the given id when deleting"
    );
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  exercise.destroy();
  res.status(StatusCodes.OK).json({ message: "Exercise deleted successfully" });
};

// Update one exercise

exports.updateExercise = async (req, res) => {
  const exercise_id = req.params.exercise_id;

  const exercise = await Exercise.findByPk(exercise_id);

  if (!exercise) {
    const error = new Error(
      "Exercise not found for the given id when updating"
    );
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  exercise.update(req.body);

  res.status(StatusCodes.OK).json({ message: "Exercise updated successfully" });
};

// Retrieve all users
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();

  if (!users) {
    const error = new Error("There is not any user");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ users: users });
};

// Retrieve one single user
exports.getOneUser = async (req, res) => {
  const id = req.params.user_id;
  const user = await User.findOne({ where: { id: id } });
  if (!user) {
    const error = new Error("No user is found by this id");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ message: "User is obtained", user: user });
};

// Retrieve user's exercises (find all exercises enrolled by the user)

exports.getUserExercises = async (req, res) => {
  const user_id = req.params.user_id;

  const user_exercise = await User.findOne({
    where: { id: user_id },
    include: {
      model: Exercise,
      through: UserExercise,
    },
  });

  if (!user_exercise) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Not exercise is for this user" });
  }

  res.status(StatusCodes.OK).json({ user_exercise: user_exercise });
};

// -> Get specific exercise for a specific user
exports.getOneUserExercise = async (req, res) => {
  const user_id = req.params.user_id;
  const exercise_id = req.params.exercise_id;

  const user_exercise = await Exercise.findOne({
    where: { id: exercise_id },
    include: {
      model: User,
      where: { id: user_id },
      through: UserExercise,
    },
  });

  if (!user_exercise) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "No exercise is found for such user_id and exercise_id",
    });
  }

  res.status(StatusCodes.OK).json({ user_exercise: user_exercise });
};

// Mission relating controllers

exports.getAllMission = async (req, res) => {
  const missions = await Mission.findAll();
  return res.status(StatusCodes.OK).json({
    message: "All missions obtained successfully",
    missions: missions,
  });
};

exports.getOneMission = async (req, res) => {
  const mission_id = req.params.mission_id;
  const mission = await Mission.findOne({ where: { id: mission_id } });

  if (!mission) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No mission is found in such id" });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Mission obtained successfully", mission: mission });
};

exports.addMission = async (req, res) => {
  const isAlreadyExist = await Mission.findOne({
    where: { missionTheme: req.body.missionTheme },
  });

  if (isAlreadyExist) {
    return res.status(StatusCodes.CONFLICT).json({
      message: "A mission with the same missionTheme is already exists!",
    });
  }

  const mission = await Mission.create(req.body);

  return res
    .status(StatusCodes.CREATED)
    .json({ message: "Mission created successfully", mission: mission });
};

exports.updateMission = async (req, res) => {
  const mission_id = req.params.mission_id;

  const isExist = await Mission.findOne({ where: { id: mission_id } });

  if (!isExist) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No mission is found in such id" });
  }

  const mission = await Mission.update(req.body, {
    where: { id: mission_id },
  });

  const newMission = await Mission.findAll();

  return res
    .status(StatusCodes.OK)
    .json({ message: "Mission update successfully", newMission: newMission });
};

exports.deleteMission = async (req, res) => {
  const mission_id = req.params.mission_id;
  const isExist = await Mission.findOne({ where: { id: mission_id } });

  if (!isExist) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No mission is found in such id" });
  }

  try {
    const deleted = await Mission.destroy({ where: { id: mission_id } });
    const missions = await Mission.findAll();
    return res
      .status(StatusCodes.OK)
      .json({ message: "Mission deleted successfully", missions: missions });
  } catch (error) {
    res.json("already Deleted");
  }
};

exports.getAllParticipantUsers = async (req, res) => {
  const missionId = req.params.mission_id;

  console.log(missionId);

  const mission = await Mission.findOne({ id: missionId });

  if (!mission) {
    return res.status(404).json({ error: "Mission not found" });
  }

  const users = await User.findAll({
    attributes: [
      "nickName",
      "email",
      "totalPoint",
      "gender",
      "height",
      "weight",
    ],
    include: [
      {
        model: Mission,
        where: { id: missionId },
        attributes: [
          "title",
          "subTitle",
          "point",
          "missionTheme",
          "targetValue",
          "usersCount",
        ],

        through: {
          model: UserMission,
          attributes: [
            "achievedPoint",
            "completionStatus",
            "startDate",
            "endDate",
          ],
        },
      },
    ],
  });

  if (!users) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "No participant user is there for this mission",
    });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Participant user obtained successfully", users: users });
};

// Notice relating controllers
exports.addNotice = async (req, res) => {
  const newNotices = await Notice.create(req.body);

  const notices = await Notice.findAll();

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Notice added successfully", notices: notices });
};

exports.getAllNotices = async (req, res) => {
  const notices = await Notice.findAll();

  res
    .status(StatusCodes.OK)
    .json({ message: "All notices obtained successfully ", notices: notices });
};

exports.deleteNotice = async (req, res) => {
  const noticeId = req.params.notice_id;

  const isExist = await Notice.destroy({ where: { id: noticeId } });

  if (!isExist) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Notice not found with id" });
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: "Notice deleted successfully" });
};

// 1:1 inquiries
exports.getAllQuestions = async (req, res) => {
  const questions = await Question.findAll();

  res.status(StatusCodes.OK).json({
    message: "All questions obtained successfully",
    questions: questions,
  });
};

exports.getOneQuestion = async (req, res) => {
  const question_id = req.params.question_id;

  const question = await Question.findOne({ where: { id: question_id } });

  if (!question) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No question is found for this id" });
  }

  res
    .status(StatusCodes.OK)
    .json({ message: "Question is obtained successfully", question: question });
};

exports.giveAnswer = async (req, res) => {
  const { question_id } = req.params;
  const { answerText } = req.body;

  if (!answerText) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: "answerText is required",
    });
  }

  const question = await Question.findByPk(question_id);

  if (!question) {
    return res.status(404).json({ message: "Question not found" });
  }

  question.answerText = answerText;
  question.status = "Answer completed";
  await question.save();

  res.status(StatusCodes.CREATED).json({
    message: "Question is answered successfully",
    question: question,
  });
};
