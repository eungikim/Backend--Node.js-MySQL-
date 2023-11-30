const { StatusCodes } = require("http-status-codes");

const { verifyJWT } = require("../utils/tokenUtils");

exports.authenticateAdmin = async (req, res, next) => {
  // const token = req.cookies.motyToken;
  const bearerToken = req.headers.authorization;

  // if (!token) {
  //   const error = new Error("Authentication invalid, no token");
  //   error.statusCode = StatusCodes.UNAUTHORIZED;
  //   throw error;
  // }

  if (!bearerToken) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message:
        "No token is passed. Please Pass the token as 'authorization': 'Bearer {token}'' ",
    });
  }

  const token = bearerToken.substring(7);

  try {
    const admin = verifyJWT(token);
    const adminId = admin.adminId;
    const role = admin.role;

    if (role !== "admin") {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Non-authorized admin, invalid role" });
    }

    req.adminId = adminId;
    req.role = role;
    next();
  } catch (err) {
    const error = new Error("Authentication invalid for admin");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }
};
