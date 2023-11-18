const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

exports.authenticateUser = async (req, res, next) => {
  try {
    req.userId = req.cookies.userId;
    const userId = req.userId;
    next();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Failed to find current user" });
  }
};
