const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const UserExercise = require("../models/userExercise");

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

    res
      .status(StatusCodes.CREATED)
      .json({
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
