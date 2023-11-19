const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");
const { verifyJWT } = require("../utils/tokenUtils");

exports.authenticateUser = async (req, res, next) => {
  const token = req.cookies.motyToken;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Authentication invalid, no token" });
  }

  try {
    const user = verifyJWT(token);
    const userId = user.userId;
    const role = user.role;

    req.userId = userId;
    next();
  } catch (err) {
    const error = new Error("Authentication invalid");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};
