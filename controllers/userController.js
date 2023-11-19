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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid exercise id when enrolling exercise" });
  }

  const exercise = Exercise.findOne({ where: { id: exercise_id } });

  if (!exercise) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid exercise id when enrolling exercise" });
  }

  const isEnrolledBefore = await UserExercise.findOne({
    where: { User_ID: user_id, Exercise_ID: exercise_id },
  });

  if (isEnrolledBefore) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "You already enrolled before" });
  }

  const enrolled = await UserExercise.create({
    User_ID: user_id,
    Exercise_ID: exercise_id,
  });

  res.status(StatusCodes.CREATED).json({
    message: "User successfully enrolled this exercise",
  });
};

// #########################################################    //

// -> Get all my exercises(what i did or enrolled) from UserExercises
exports.getUserExercises = async (req, res) => {
  const user_id = req.userId;

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
      .json({ message: "You don't have any exercise yet" });
  }

  res.status(StatusCodes.OK).json({ user_exercise: user_exercise });
};

// #########################################################    //

// -> Get specific exercise form my exercises
exports.getOneUserExercise = async (req, res) => {
  const user_id = req.userId;
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
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "You don't have any exercise yet" });
  }

  res.status(StatusCodes.OK).json({ user_exercise: user_exercise });
};
