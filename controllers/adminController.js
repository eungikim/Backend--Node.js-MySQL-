const { StatusCodes } = require("http-status-codes");

const Admin = require("../models/admin");

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.create({
      email,
      password,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Admin successfully logged in" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to login admin" });
  }
};
