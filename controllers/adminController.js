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
