const adminLogin = require("./admin-login");
const resetPassword = require("./admin-password/reset-password");
const updatePassword = require("./admin-password/update-password");

const getAllUser = require("./get-users");
const getOneUser = require("./get-user");
const getAllExercises = require("./get-exercises");
const getOneExercise = require("./get-exercise");
const createNewExercise = require("./create-exercise");
const updateExercise = require("./update-exercise");
const deleteExercise = require("./delete-exercise");
const getUserExercises = require("./get-userExercises");
const getOneUserExercise = require("./get-userExercise");

const getAllMissions = require("./missions-admin/getAllMissions");
const getOneMission = require("./missions-admin/getOneMission");
const addMission = require("./missions-admin/addMission");
const updateMission = require("./missions-admin/updateMission");
const deleteMission = require("./missions-admin/deleteMission");

const sign = require("./user-related/register");
const userCompleteLogin = require("./user-related/complete-register");

const getAllExercisesU = require("./user-related/get-all-exercises");
const getOneExerciseU = require("./user-related/get-one-exercise");
const enrollExerciseU = require("./user-related/enroll-exercise");
const getAllMyExercises = require("./user-related/get-myExercises");
const getOneUserExerciseMy = require("./user-related/get-myExercise");
const sendReport = require("./user-related/send-report");
const getWeekExercise = require("./user-related/get-this-week");
const getOneDayExercise = require("./user-related/get-one-day");
const getTodayExercises = require("./user-related/get-my-today-exercises");

const getAllMissionsU = require("../routes/mission-user/get-all-missions");
const getOneMissionU = require("../routes/mission-user/get-one-mission");
const enrollOneMission = require("../routes/mission-user/enroll-mission");
const getEnrolledMissions = require("../routes/mission-user/get-my-missions");
const getReward = require("./mission-user/get-reward");

const getAllMissionsParticipants = require("../routes/missions-admin/missionParticipantUsers");

const getAllNotices = require("./notice-related/admin-get-all-notices");
const deleteNotice = require("./notice-related/admin-delete-notice");
const addNotice = require("./notice-related/admin-add-notices");
const getAllNoticesU = require("./notice-related/user-get-all-notices");

const getAllQuestions = require("./one-to-one/get-all-questions");
const getOneQuestion = require("./one-to-one/get-one-question");
const askQuestion = require("./one-to-one/ask-question");
const answerQuestion = require("./one-to-one/answer-a-question");
const getAllMyQandA = require("./one-to-one/get-all-my-qANDa");
const getMyOneQandA = require("./one-to-one/get-my-qANDa");

module.exports = {
  paths: {
    "/api/v1/auth/admin-login": {
      ...adminLogin,
    },

    "api/v1/auth/reset-password": {
      ...resetPassword,
    },

    "/api/v1/auth/update-password": {
      ...updatePassword,
    },

    "/api/v1/admin/exercise": {
      ...createNewExercise,
    },

    "/api/v1/admin/exercises": {
      ...getAllExercises,
    },

    "/api/v1/admin/exercise/{exercise_id}": {
      get: {
        ...getOneExercise.get,
      },
      patch: {
        ...updateExercise.patch,
      },
      delete: {
        ...deleteExercise.delete,
      },
    },

    "/api/v1/admin/missions": {
      ...getAllMissions,
    },

    "/api/v1/admin/mission": {
      ...addMission,
    },

    "/api/v1/admin/mission/{mission_id}": {
      get: {
        ...getOneMission.get,
      },
      patch: {
        ...updateMission.patch,
      },
      delete: {
        ...deleteMission.delete,
      },
    },

    "/api/v1/admin/users": {
      ...getAllUser,
    },
    "/api/v1/admin/user/{user_id}": {
      ...getOneUser,
    },
    "/api/v1/admin/user/exercises/{user_id}": {
      ...getUserExercises,
    },
    "/api/v1/admin/user/{user_id}/exercise/{exercise_id}/": {
      ...getOneUserExercise,
    },

    "/api/v1/admin/notice": {
      ...addNotice,
    },

    "/api/v1/admin/notices": {
      ...getAllNotices,
    },

    "/api/v1/admin/notice/{notice_id}": {
      ...deleteNotice,
    },

    "/api/v1/admin/questions": {
      ...getAllQuestions,
    },

    "/api/v1/admin/question/{question_id}": {
      get: {
        ...getOneQuestion.get,
      },
      put: {
        ...answerQuestion.put,
      },
    },

    "/api/v1/admin/": {},

    "/api/v1/auth/sign": {
      ...sign,
    },

    "/api/v1/auth/complete-register": {
      ...userCompleteLogin,
    },

    "/api/v1/user/exercises": {
      ...getAllExercisesU,
    },

    "/api/v1/user/exercise/{exercise_id}": {
      get: {
        ...getOneExerciseU.get,
      },
      post: {
        ...enrollExerciseU.post,
      },
    },

    "/api/v1/user/my-exercises": {
      ...getAllMyExercises,
    },

    "/api/v1/user/my-exercise/{exercise_id}": {
      ...getOneUserExerciseMy,
    },

    "/api/v1/user/my-exercise/{year}/{month}/{day}": {
      ...getOneDayExercise,
    },

    "/api/v1/user/my-exercise/week-exercises": {
      ...getWeekExercise,
    },

    "/api/v1/user/my-exercise/today-exercises": {
      ...getTodayExercises,
    },

    "/api/v1/user/report/{exercise_id}": {
      ...sendReport,
    },

    "/api/v1/user/missions/all": {
      ...getAllMissionsU,
    },

    "/api/v1/user/mission/{mission_id}": {
      get: {
        ...getOneMissionU.get,
      },
      post: {
        ...enrollOneMission.post,
      },
    },

    "api/v1/user/notices": {
      ...getAllNoticesU,
    },

    "/api/v1/user/get-reward/{mission_id}": {
      ...getReward,
    },

    "/api/v1/user/my_missions": {
      ...getEnrolledMissions,
    },

    "/api/v1/admin/mission/{mission_id}/users": {
      ...getAllMissionsParticipants,
    },
  },
};
