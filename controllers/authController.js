const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

const cookieParser = require("cookie-parser");

exports.loginWithGoogle = async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ where: { accountId: req.user.id } });

    req.thisUser = thisUser;

    res.cookie("userId", thisUser.id, { httpOnly: true });

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User created successfully", user: thisUser });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to create user" });
  }
};

exports.completeLogin = async (req, res, next) => {
  const { nickName, gender, height, weight } = req.body;

  console.log("This is the user when adding data", req.userId);

  try {
    const userId = req.userId;
    const user = await User.findOne({ where: { id: userId } });

    user.nickName = nickName;
    user.gender = gender;
    user.height = height;
    user.weight = weight;
    user.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User data successfully added" });
  } catch (err) {
    req
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Failed to add user data" });
  }
};
