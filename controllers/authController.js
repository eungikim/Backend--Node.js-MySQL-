const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

exports.userLogin = async (req, res, next) => {
  try {
    const { email, loginType, imageURL, nickName, gender, height, weight } =
      req.body;

    const user = await User.create({
      email,
      loginType,
      imageURL,
      nickName,
      gender,
      height,
      weight,
    });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create user" });
  }
};
