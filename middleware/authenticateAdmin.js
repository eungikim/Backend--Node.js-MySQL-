const { StatusCodes } = require("http-status-codes");

const { verifyJWT } = require("../utils/tokenUtils");

exports.authenticateAdmin = async (req, res, next) => {
  const token = req.cookies.motyToken;

  if (!token) {
    const error = new Error("Authentication invalid, no token");
    error.statusCode = StatusCodes.UNAUTHORIZED;
    throw error;
  }

  try {
    const admin = verifyJWT(token);
    const adminId = admin.adminId;
    const role = admin.role;

    if (role !== "admin") {
      const error = new Error("Not allowed to access");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
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
