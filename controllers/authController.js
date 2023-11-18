const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

exports.loginWithGoogle = async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ where: { accountId: req.user.id } });

    req.thisUser = thisUser;

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user: thisUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create user" });
  }
};
