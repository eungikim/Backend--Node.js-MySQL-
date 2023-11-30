const { StatusCodes } = require("http-status-codes");
const { Op, literal } = require("sequelize");
const Exercise = require("../models/exercise");
const User = require("../models/user");
const UserExercise = require("../models/userExercise");

const UserMission = require("../models/userMission");

const Mission = require("../models/mission");

// #####################################################  //

// -> Retrieve a list of exercises the user can choose from
// -> Retrieve photos of each exercise

exports.getAllExercises = async (req, res) => {
  const exercises = await Exercise.findAll();

  if (!exercises) {
    const error = new Error("No exercise is found");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ exercises: exercises });
};

// #########################################################    //

// -> Retrieve detailed information of a specific exercise
// -> Retrieve the video of a specific exercise
// -> Retrieve the preparation pose and description of a specific exercise
// -> Retrieve the method of performing a specific exercise
// -> Retrieve the precautions of a specific exercise

exports.getOneExercise = async (req, res) => {
  const id = await req.params.exercise_id;
  const exercise = await Exercise.findOne({ where: { id: id } });

  if (!exercise) {
    const error = new Error("Exercise not found for the given id");
    error.statusCode = StatusCodes.NOT_FOUND;
    throw error;
  }

  res.status(StatusCodes.OK).json({ exercise: exercise });
};

// #########################################################    //

// -> Add exercise to user_exercise (Enroll exercise)
exports.addUserExercise = async (req, res) => {
  const user_id = req.userId;
  const exercise_id = req.params.exercise_id;
  const startDate = req.body.startDate;

  console.log("HERE PASS");

  if (!user_id) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "userId is required when enrolling exercise" });
  }

  const userExists = await User.findOne({
    where: { id: user_id },
  });

  const exercise = await Exercise.findOne({ where: { id: exercise_id } });

  if (!userExists) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid user id when enrolling exercise" });
  }

  if (!exercise) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid exercise id when enrolling exercise" });
  }

  const isEnrolledBefore = await UserExercise.findOne({
    where: {
      User_ID: user_id,
      Exercise_ID: exercise_id,
      startDate: {
        [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)), // Set the time to the start of today
        [Op.lt]: new Date(new Date().setHours(23, 59, 59, 999)), // Set the time to the end of today
      },
    },
  });

  // if (isEnrolledBefore) {
  //   return res
  //     .status(StatusCodes.BAD_REQUEST)
  //     .json({ message: "You already enrolled this exercise today" });
  // }

  const isExist = await Exercise.findOne({ where: { id: exercise_id } });
  // If this is the first time the user enroll this exercise increase the exercise counter by 1

  const isFirstTime = await UserExercise.findOne({
    where: { User_ID: user_id, Exercise_ID: exercise_id },
  });

  if (!isFirstTime) {
    const updateCount = await Exercise.update(
      {
        usersCount: isExist.usersCount + 1,
      },
      { where: { id: exercise_id } }
    );
  }

  const currentDate = new Date();

  const enrolled = await UserExercise.create({
    User_ID: user_id,
    Exercise_ID: exercise_id,
    startDate: startDate,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Exercise successfully enrolled",
  });
};

// #########################################################    //

// -> Get all my exercises(what i did or enrolled) from UserExercises
exports.getUserExercises = async (req, res) => {
  const user_id = req.userId;

  const user_exercise = await User.findOne({
    where: { id: user_id },
    attributes: ["id", "email"],
    include: {
      model: Exercise,
      through: UserExercise,
    },
  });

  if (!user_exercise) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "You don't have any exercise yet" });
  }

  res.status(StatusCodes.OK).json({
    message: "User-exercise obtained successfully",
    user_exercise: user_exercise,
  });
};

// #########################################################    //

// -> Get specific exercise form my exercises
exports.getOneUserExercise = async (req, res) => {
  const user_id = req.userId;
  const exercise_id = req.params.exercise_id;

  const user_exercise = await Exercise.findOne({
    where: { id: exercise_id },
    include: {
      model: User,
      where: { id: user_id },
      through: UserExercise,
    },
  });

  if (!user_exercise) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "You don't have any exercise yet" });
  }

  res.status(StatusCodes.OK).json({ user_exercise: user_exercise });
};

// #########################################################    //
// -> Get this month (last 30days) including todays
exports.getMonthExercise = async (req, res) => {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const exercises = await UserExercise.findAll({
      where: {
        User_ID: req.userId,
        createdAt: {
          [Op.between]: [
            new Date(
              thirtyDaysAgo.getFullYear(),
              thirtyDaysAgo.getMonth(),
              thirtyDaysAgo.getDate()
            ),
            new Date(
              today.getFullYear(),
              today.getMonth(),
              today.getDate() + 1
            ),
          ],
        },
      },
    });

    if (exercises.length === 0) {
      return res.json({ message: "No exercises found for this month" });
    }

    res.status(StatusCodes.OK).json({
      message: "User exercise for the last 30 days obtained successfully",
      exercises: exercises,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// #########################################################    //
// -> Get this week my-exercise (including today)
exports.getWeekExercise = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    console.log("PASS");

    console.log(sevenDaysAgo, today);

    const exercises = await UserExercise.findAll({
      where: {
        startDate: {
          [Op.gte]: sevenDaysAgo,
          [Op.lte]: today,
        },
        User_ID: req.userId,
      },
    });

    res.status(StatusCodes.OK).json({
      message:
        "User exercise of the past 7 days (including today) obtained successfully",
      exercises: exercises,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// #########################################################    //
// -> Get my todays exercise
exports.getTodayExercises = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );
    const exercises = await UserExercise.findAll({
      where: {
        User_ID: req.userId,
        startDate: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
    });

    if (exercises.length === 0) {
      return res.json({ message: "No exercises found for today" });
    }

    res.json({
      message: "User today's exercises obtained successfully",
      exercises: exercises,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
// #########################################################    //
// Get my-exercise by date
exports.getByDate = async (req, res) => {
  try {
    const { year, month, day } = req.params;
    const exerciseDate = new Date(`${year}-${month}-${day}`);

    const exercises = await UserExercise.findAll({
      where: {
        User_ID: req.userId,
        startDate: {
          [Op.between]: [
            new Date(
              exerciseDate.getFullYear(),
              exerciseDate.getMonth(),
              exerciseDate.getDate()
            ),
            new Date(
              exerciseDate.getFullYear(),
              exerciseDate.getMonth(),
              exerciseDate.getDate() + 1
            ),
          ],
        },
      },
    });

    if (!exercises || exercises.length == 0) {
      return res.status(404).json({ error: "Exercise not found for this day" });
    }

    res.json({
      message: `User exercise of ${exerciseDate.getFullYear()}-${
        exerciseDate.getMonth() + 1
      }-${exerciseDate.getDate()} obtained successfully`,
      exercises: exercises,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// #########################################################    //
// -> Send a report
exports.sendReport = async (req, res) => {
  try {
    const {
      performance,
      totalWeight,
      totalCalories,
      exerciseTime,
      isSupported,
      startDate,
      dueDate,
    } = req.body;

    const user_id = req.userId;
    const exercise_id = req.params.exercise_id;

    if (!exercise_id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "exercise id is required when sending a report" });
    }

    const userExists = await User.findOne({
      where: { id: user_id },
    });

    if (!userExists) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No user is found with this id",
      });
    }

    console.log(literal(`DATE(startDate) = '${startDate}'`));

    const exercise = await UserExercise.findOne({
      where: {
        User_ID: user_id,
        Exercise_ID: exercise_id,
        startDate: literal(`DATE(startDate) = '${startDate}'`),
      },
    });

    if (!exercise) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "You don't have this exercise for such date",
      });
    }

    await UserExercise.update(
      {
        // point_Achieved: exercise.point_Achieved + point_Achieved,
        // completion_status,

        performance: performance,
        totalWeight: exercise.totalWeight + totalWeight,
        totalCalories: exercise.totalCalories + totalCalories,
        exerciseTime: exercise.exerciseTime + exerciseTime,
        isSupported: isSupported,
        // startDate: new Date() // May be later
        dueDate: dueDate ? dueDate : exercise.dueDate,
      },
      {
        where: {
          User_ID: user_id,
          Exercise_ID: exercise_id,
          startDate: literal(`DATE(startDate) = '${startDate}'`),
        },
      }
    );

    //
    const TotalExerciseMission = await Mission.findOne({
      where: { missionTheme: "TotalExercise" },
    });
    const TotalWeightMission = await Mission.findOne({
      where: { missionTheme: "TotalWeight" },
    });
    const TotalCaloriesMission = await Mission.findOne({
      where: { missionTheme: "TotalCalories" },
    });
    //

    // Find missions which this user enrolled and update those value
    const userTotalExerciseMission = await UserMission.findOne({
      where: { UserID: user_id, missionTheme: "TotalExercise" },
    });

    const userTotalWeightMission = await UserMission.findOne({
      where: { UserID: user_id, missionTheme: "TotalWeight" },
    });

    const userTotalCaloriesMission = await UserMission.findOne({
      where: { UserID: user_id, missionTheme: "TotalCalories" },
    });

    if (userTotalExerciseMission) {
      userTotalExerciseMission.achievedPoint =
        userTotalExerciseMission.achievedPoint + exerciseTime;

      if (
        userTotalExerciseMission.achievedPoint >=
        userTotalExerciseMission.targetValue
      ) {
        if (userTotalExerciseMission.completionStatus != "completed") {
          TotalExerciseMission.usersCount = TotalExerciseMission.usersCount + 1;
          await TotalExerciseMission.save();
        }

        userTotalExerciseMission.completionStatus = "completed";
        userTotalExerciseMission.endDate = new Date();

        // userExists.totalPoint =
        //   userExists.totalPoint + userTotalExerciseMission.point;
        // await userExists.save();
      }

      await userTotalExerciseMission.save();
    }

    if (userTotalWeightMission) {
      userTotalWeightMission.achievedPoint =
        userTotalWeightMission.achievedPoint + totalWeight;
      if (
        userTotalWeightMission.achievedPoint >=
        userTotalWeightMission.targetValue
      ) {
        if (userTotalWeightMission.completionStatus != "completed") {
          TotalWeightMission.usersCount = TotalWeightMission.usersCount + 1;
          await TotalWeightMission.save();
        }

        userTotalWeightMission.completionStatus = "completed";
        userTotalWeightMission.endDate = new Date();

        // userExists.totalPoint =
        //   userExists.totalPoint + userTotalWeightMission.point;
        // await userExists.save();
      }

      await userTotalWeightMission.save();
    }

    if (userTotalCaloriesMission) {
      userTotalCaloriesMission.achievedPoint =
        userTotalCaloriesMission.achievedPoint + totalCalories;
      if (
        userTotalCaloriesMission.achievedPoint >=
        userTotalCaloriesMission.targetValue
      ) {
        if (userTotalCaloriesMission.completionStatus != "completed") {
          TotalCaloriesMission.usersCount = TotalCaloriesMission.usersCount + 1;
          await TotalCaloriesMission.save();
        }

        userTotalCaloriesMission.completionStatus = "completed";
        userTotalCaloriesMission.endDate = new Date();

        // userExists.totalPoint =
        //   userExists.totalPoint + userTotalCaloriesMission.point;
        // await userExists.save();
      }

      await userTotalCaloriesMission.save();
    }

    const updatedExercise = await UserExercise.findOne({
      where: { User_ID: user_id, Exercise_ID: exercise_id },
    });

    res.status(StatusCodes.CREATED).json({
      message: "Reported successfully added",
      exercise_report: updatedExercise,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Error when adding a report" });
  }
};

// Mission relating controllers

// Enroll mission
exports.addUserMission = async (req, res) => {
  const userId = req.userId;
  const mission_id = req.params.mission_id;

  const userExists = await User.findOne({
    where: { id: userId },
  });

  const missionExists = await Mission.findOne({
    where: { id: mission_id },
  });

  if (!missionExists) {
    return res.status(404).json({ error: "Mission not found" });
  }

  if (!missionExists) {
    return res.status(404).json({ error: "User not found" });
  }

  const isEnrolledBefore = await UserMission.findOne({
    where: { UserID: userId, MissionID: mission_id },
  });

  if (isEnrolledBefore) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "You already enrolled before" });
  }

  let achievedPoint = 0;

  if (missionExists.missionTheme === "Attendance") {
    achievedPoint = 1;
  }

  const enrollment = await UserMission.create({
    UserID: userId,
    MissionID: mission_id,
    title: missionExists.title,
    subTitle: missionExists.subTitle,
    missionTheme: missionExists.missionTheme,
    targetValue: missionExists.targetValue,
    point: missionExists.point,
    achievedPoint: achievedPoint,
    startDate: new Date(),
  });

  return res.status(StatusCodes.CREATED).json({
    message: "User mission enrolled successfully",
    enrollment: enrollment,
  });
};

exports.getUserMissions = async (req, res) => {
  const userId = req.userId;

  const userMission = await User.findOne({
    where: { id: userId },
    attributes: ["id", "email"],
    include: {
      model: Mission,
      through: {
        model: UserMission,
        attributes: [
          "achievedPoint",
          "achievedPoint",
          "startDate",
          "createdAt",
          "endDate",
          "updatedAt",
          "completionStatus",
        ],
      },
    },
  });

  if (!userMission) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "You don't have any mission yet" });
  }

  return res.status(StatusCodes.OK).json({
    message: "User mission obtained successfully",
    userMission: userMission,
  });
};

exports.getOneUseMission = async (req, res) => {
  const user_id = req.userId;
  const mission_id = req.params.mission_id;

  const user_mission = await Mission.findOne({
    where: { id: mission_id },
    include: {
      model: User,
      where: { id: user_id },
      through: UserMission,
    },
  });

  if (!user_mission) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "You don't have any exercise yet" });
  }

  res.status(StatusCodes.OK).json({ user_exercise: user_mission });
};

// Get my reward
exports.getReward = async (req, res) => {
  const userId = req.userId;
  const missionId = req.params.mission_id;

  // Check if there exist a mission with this id
  const missionExist = await Mission.findOne({ where: { id: missionId } });

  if (!missionExist) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "No mission is found with this id" });
  }

  // Check if the user enrolled this mission
  const userMissionExist = await UserMission.findOne({
    where: { UserID: userId, MissionID: missionId },
  });

  if (!userMissionExist) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message:
        "User didn't enroll this mission, please enroll it before trying to get the reward",
    });
  }

  // Check if the user complete this mission
  if (userMissionExist.completionStatus !== "completed") {
    return res.status(StatusCodes.OK).json({
      message:
        "User didn't complete this mission, please complete it before trying to get the reward",
    });
  }

  // give the reward point to this user
  const thisUser = await User.findOne({ where: { id: userId } });

  thisUser.totalPoint = thisUser.totalPoint + missionExist.point;
  await thisUser.save();

  // Delete this user mission to enable him to enroll it again
  // const deletedRows = await UserMission.destroy({
  //   where: { UserID: userId, MissionID: missionId },
  // });

  return res.status(StatusCodes.OK).json({
    message: "The reward point added successfully to the user's total point",
    newAddedPoint: missionExist.point,
    totalUserPoint: thisUser.totalPoint,
  });
};

// Update profile

exports.updateProfileImage = async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.userId } });

  user.imageURL = req.file.location;

  await user.save();

  res.json({
    message: "Profile image updated successfully!",
    newImageURL: user.imageURL,
  });
};
