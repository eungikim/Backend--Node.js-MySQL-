const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const { createJWT } = require("../utils/tokenUtils");

exports.loginWithGoogle = async (req, res, next) => {
  try {
    const thisUser = await User.findOne({ where: { accountId: req.user.id } });

    req.thisUser = thisUser;

    const token = createJWT({ userId: thisUser.id, role: "user" });

    res.cookie("motyToken", token, { httpOnly: false });

    res
      .status(StatusCodes.CREATED)
      // .json({ message: "User logged in successfully", user: thisUser })
      .redirect("https://api-tester-wxhg.vercel.app/login-second");
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

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

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

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: { email: email },
    });

    if (!admin) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Non-authorized admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Password not much" });
    }

    const token = createJWT({ adminId: admin.id, role: "admin" });

    res.cookie("motyToken", token, { httpOnly: true });

    return res
      .status(StatusCodes.OK)
      .json({ message: "Admin successfully logged in" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Failed to login admin" });
  }
};
