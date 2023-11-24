const { StatusCodes } = require("http-status-codes");

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

  if (!user_id) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid exercise id when enrolling exercise" });
  }

  const exercise = await Exercise.findOne({ where: { id: exercise_id } });

  if (!exercise) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Invalid exercise id when enrolling exercise" });
  }

  const isEnrolledBefore = await UserExercise.findOne({
    where: { User_ID: user_id, Exercise_ID: exercise_id },
  });

  if (isEnrolledBefore) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "You already enrolled before" });
  }

  const enrolled = await UserExercise.create({
    User_ID: user_id,
    Exercise_ID: exercise_id,
  });

  const isExist = await Exercise.findOne({ where: { id: exercise_id } });
  const updateCOunt = await Exercise.update(
    {
      usersCount: isExist.usersCount + 1,
    },
    { where: { id: exercise_id } }
  );

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

// -> Send a report
exports.sendReport = async (req, res) => {
  try {
    const {
      performance,
      totalWeight,
      totalCalories,
      exerciseTime,
      isSupported,
    } = req.body;

    const user_id = req.userId;
    const exercise_id = req.params.exercise_id;

    if (!exercise_id) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "exercise id is required when sending a report" });
    }

    const exercise = await UserExercise.findOne({
      where: { User_ID: user_id, Exercise_ID: exercise_id },
    });

    if (!exercise) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No exercise is found for this user_id and exercise_id",
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
      },
      {
        where: {
          User_ID: user_id,
          Exercise_ID: exercise_id,
        },
      }
    );

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
exports.addUserMission = async (req, res) => {
  const userId = req.userId;
  const mission_id = req.params.mission_id;

  const userExists = await User.findOne({
    where: { id: userId },
  });

  const missionExists = await Mission.findOne({
    where: { id: mission_id },
  });

  if (!userExists || !missionExists) {
    return res.status(404).json({ error: "User or Mission not found" });
  }

  const enrollment = await UserMission.create({
    UserID: userId,
    MissionID: mission_id,
    title: missionExists.title,
    subTitle: missionExists.subTitle,
    missionTheme: missionExists.missionTheme,
    targetValue: missionExists.targetValue,
    point: missionExists.point,
  });

  const updateCOunt = await Mission.update(
    {
      usersCount: missionExists.usersCount + 1,
    },
    { where: { id: mission_id } }
  );

  return res.status(StatusCodes.CREATED).json({
    message: "User mission enrolled successfully",
    enrollment: enrollment,
  });
};

exports.getUserMissions = async (req, res) => {
  const userId = req.userId;
  const userMission = await User.findOne({
    where: { userId },
    include: {
      model: Mission,
      through: UserMission,
    },
  });
  return res.status(StatusCodes.OK).json({
    message: "User mission obtained successfully",
    userMission: userMission,
  });
};
