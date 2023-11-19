const { StatusCodes } = require("http-status-codes");

const Exercise = require("../models/exercise");
const User = require("../models/user");
const UserExercise = require("../models/userExercise");

// #####################################################  //

// -> Retrieve a list of exercises the user can choose from
// -> Retrieve photos of each exercise

exports.getAllExercises = async (req, res) => {
  const exercises = await Exercise.findAll();
  res.status(StatusCodes.OK).json({ exercises: exercises });
};

// #########################################################    //

// -> Retrieve detailed information of a specific exercise
// -> Retrieve the video of a specific exercise
// -> Retrieve the preparation pose and description of a specific exercise
// -> Retrieve the method of performing a specific exercise
// -> Retrieve the precautions of a specific exercise

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

// #########################################################    //

// -> Add exercise to user_exercise (Enroll exercise)
exports.addUserExercise = async (req, res) => {
  const user_id = req.userId;
  const exercise_id = req.params.exercise_id;

  if (!user_id) {
    const error = new Error("Invalid user id when enrolling exercise");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  if (!exercise_id) {
    const error = new Error("Invalid exercise id when enrolling exercise");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  const enrolled = await UserExercise.create({
    User_ID: user_id,
    ExerciseID: exercise_id,
  });

  res.status(StatusCodes.CREATED).json({
    message: "User successfully enrolled this exercise",
    enrolledExercise: enrolled,
  });
};
