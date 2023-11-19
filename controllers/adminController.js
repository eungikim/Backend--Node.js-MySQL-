const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const UserExercise = require("../models/userExercise");

// Retrieve all exercises
exports.getAllExercises = async (req, res) => {
  const exercises = await Exercise.findAll();
  res.status(StatusCodes.OK).json({ exercises: exercises });
};

// Retrieve one single exercise
exports.getOneExercise = async (req, res) => {
  const id = await req.params.exercise_id;
  const exercise = await Exercise.findOne({ where: { id: id } });

  if (!exercise) {
    const error = new Error("Exercise not found for the given id");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ exercise: exercise });
};

// Add exercise to the exercises list
exports.addExercise = async (req, res) => {
  const {
    name,
    imageURL,
    videoURL,
    detailed_information,
    achievement_point,
    duration,
    method_of_performing,
    pose_and_description,
    precaution,
  } = req.body;
  try {
    const newExercise = await Exercise.create({
      name,
      imageURL,
      videoURL,
      detailed_information,
      achievement_point,
      duration,
      method_of_performing,
      pose_and_description,
      precaution,
    });

    res.status(StatusCodes.CREATED).json({ newExercise: newExercise });
  } catch (err) {
    res.status(401).json({ message: "Error when adding exercise" });
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
    error.StatusCode = StatusCodes.NOT_FOUND;
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
    error.StatusCode = StatusCodes.NOT_FOUND;
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
    error.StatusCode = StatusCodes.NOT_FOUND;
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
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ user: user });
};

// Retrieve one user exercises (find all exercises enrolled by user)

// exports.getUserExercises = async (req, res) => {
//   const id = req.params.user_id;
//   const userExercises = await UserExercise.findAll({ where: { User_ID: id } });
//   res.status(StatusCodes.OK).json({ userExercises: userExercises });
// };
