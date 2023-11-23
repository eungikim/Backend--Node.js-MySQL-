const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");
const { verifyJWT } = require("../utils/tokenUtils");

exports.authenticateUser = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message:
        "No token is passed. Please Pass the token as 'authorization': 'Bearer {token}'' ",
    });
  }

  const token = bearerToken.substring(7);

  // console.log("This is the token when authenticate", token);

  console.log(verifyJWT(token));

  try {
    const user = verifyJWT(token);
    const userId = user.userId;

    if (!userId) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Please sign up first to add more information" });
    }

    const role = user.role;

    req.userId = userId;
    next();
  } catch (err) {
    const error = new Error("Authentication invalid");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};
