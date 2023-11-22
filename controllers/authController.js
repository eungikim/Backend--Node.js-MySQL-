const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const { createJWT } = require("../utils/tokenUtils");

exports.sign = async (req, res, next) => {
  const email = req.body.email;
  const loginType = req.body.loginType;
  const socialToken = req.body.socialToken;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "email is required" });
  }
  if (!loginType) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "loginType is required" });
  }
  if (!socialToken) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "socialToken is required" });
  }

  const thisUser = await User.findOne({ where: { email: email } });

  if (thisUser && thisUser.gender) {
    console.log("This is user", thisUser);
    // If the user's gender is not NULL this means that this user is already a member
    const token = createJWT({ userId: thisUser.id, role: "user" });
    await thisUser.update({ isMember: true });
    res.cookie("motyToken", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });

    return res.json({ message: "User successfully logged in", user: thisUser });
  } else if (thisUser) {
    const token = createJWT({ userId: thisUser.id, role: "user" });
    await thisUser.update({ isMember: false });
    res.cookie("motyToken", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });

    return res.json({
      message: "User successfully registered",
      user: thisUser,
    });
  } else {
    const user = await User.create({
      email: email,
      loginType: loginType,
      socialToken: socialToken,
    });

    const token = createJWT({ userId: user.id, role: "user" });
    res.cookie("motyToken", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });
    await user.update({ isMember: false });
    return res.json({
      message: "User successfully registered",
      user: user,
    });
  }
};

exports.completeLogin = async (req, res, next) => {
  const { nickName, gender, height, weight } = req.body;

  console.log("This is the user when adding data", req.userId);

  try {
    const userId = req.userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    user.nickName = nickName;
    user.gender = gender;
    user.height = height;
    user.weight = weight;
    user.isMember = true;
    user.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "User data successfully added", user: user });
  } catch (err) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Failed to add user data" });
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: { email: email },
    });

    if (!admin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Incorrect email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password not much" });
    }

    const token = createJWT({ adminId: admin.id, role: "admin" });

    res.cookie("motyToken", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Admin successfully logged in" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to login admin" });
  }
};
