const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const Exercise = require("../models/exercise");
const User = require("../models/user");

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: { email: email },
    });

    if (!admin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Non-authorized admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      const error = new Error("Password not match");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    return res
      .status(StatusCodes.OK)
      .json({ message: "Admin successfully logged in" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to login admin" });
  }
};

exports.getAllExercises = async (req, res) => {
  const exercise = await Exercise.findAll();
  res.status(StatusCodes.OK).json({ exercise: exercise });
};

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

exports.addExercise = async (req, res) => {
  const {
    Name,
    imageURL,
    achievement_point,
    duration,
    method_of_performing,
    pose_and_description,
    videoUrl,
    Precaution,
  } = req.body;
  try {
    const newExercise = await Exercise.create({
      Name,
      imageURL,
      achievement_point,
      duration,
      method_of_performing,
      pose_and_description,
      videoUrl,
      Precaution,
    });

    res.status(StatusCodes.CREATED).json({ newExercise: newExercise });
  } catch (err) {
    res.status(401).json({ message: "Error when adding exercise" });
  }
};

exports.deleteExercise = async (id) => {
  const exercise = await Exercise.findByPk(id);
  if (!exercise) {
    const error = new Error(
      "Exercise not found for the given id when deleting"
    );
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  exercise.destroy();
  res.status(StatusCodes.OK).json({ deletedExercise: exercise });
};
