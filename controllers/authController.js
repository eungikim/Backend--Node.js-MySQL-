const { StatusCodes } = require("http-status-codes");

const User = require("../models/user");

const bcrypt = require("bcryptjs");

const Admin = require("../models/admin");
const UserMission = require("../models/userMission");
const { createJWT } = require("../utils/tokenUtils");

function isConsecutiveDates(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);

  return Math.abs(firstDate - secondDate) === oneDay;
}

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
    // If the user's gender is not NULL this means that this user is already a member
    const token = createJWT({ userId: thisUser.id, role: "user" });
    await thisUser.update({ isMember: true, jwtToken: token });

    // If this user enroll the Attendance mission, increase his achieved point by one
    const userAttendanceMission = await UserMission.findOne({
      where: { UserID: thisUser.id, missionTheme: "Attendance" },
    });

    if (userAttendanceMission) {
      const lastLoginDate = thisUser.lastLoginDate;

      const currentDateNow = new Date();

      currentDateNow.setDate(currentDateNow.getDate() + 2);

      const formattedDate = `${currentDateNow.getFullYear()}-${(
        currentDateNow.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${currentDateNow
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      const lastFormattedDate = `${lastLoginDate.getFullYear()}-${(
        lastLoginDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${lastLoginDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;

      console.log(isConsecutiveDates(lastFormattedDate, formattedDate));

      if (isConsecutiveDates(lastFormattedDate, formattedDate)) {
        userAttendanceMission.achievedPoint =
          userAttendanceMission.achievedPoint + 1;
        userAttendanceMission.save();

        if (
          userAttendanceMission.achievedPoint >=
          userAttendanceMission.targetValue
        ) {
          userAttendanceMission.completionStatus = "completed";
          userAttendanceMission.endDate = new Date();
          await userAttendanceMission.save();

          thisUser.totalPoint =
            thisUser.totalPoint + userAttendanceMission.point;
          await thisUser.save();
        }
      } else {
        userAttendanceMission.achievedPoint = 1;
        userAttendanceMission.completionStatus = "inProgress";
        userAttendanceMission.save();
      }
    }

    thisUser.lastLoginDate = new Date();
    await thisUser.save();

    return res.json({ message: "User successfully logged in", user: thisUser });
  } else if (thisUser) {
    const token = createJWT({ userId: thisUser.id, role: "user" });
    await thisUser.update({ isMember: false, jwtToken: token });

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

    await user.update({ isMember: false, jwtToken: token });

    return res.json({
      message: "User successfully registered",
      user: user,
    });
  }
};

exports.completeLogin = async (req, res, next) => {
  console.log("This is the user when adding data", req.userId);

  try {
    const userId = req.userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "User not found" });
    }

    const userUpdate = await user.update(req.body);
    await user.update({ isMember: true });
    user.lastLoginDate = new Date();
    await user.save();

    const completeUser = await User.findOne({ where: { id: userId } });

    res.status(StatusCodes.CREATED).json({
      message: "User data successfully added",
      completeUser: completeUser,
    });
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
