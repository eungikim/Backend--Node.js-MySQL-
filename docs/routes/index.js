const adminLogin = require("./admin-login");
const getAllUser = require("./get-users");
const getOneUser = require("./get-user");
const getAllExercises = require("./get-exercises");
const getOneExercise = require("./get-exercise");
const createNewExercise = require("./create-exercise");
const updateExercise = require("./update-exercise");
const deleteExercise = require("./delete-exercise");
const getUserExercises = require("./get-userExercises");
const getOneUserExercise = require("./get-userExercise");

const sign = require("./user-related/register");
const userCompleteLogin = require("./user-related/complete-register");

const getAllExercisesU = require("./user-related/get-all-exercises");
const getOneExerciseU = require("./user-related/get-one-exercise");
const enrollExerciseU = require("./user-related/enroll-exercise");
const getAllMyExercises = require("./user-related/get-myExercises");
const getOneUserExerciseMy = require("./user-related/get-myExercise");
const sendReport = require("./user-related/send-report");

module.exports = {
  paths: {
    "/api/v1/auth/admin-login": {
      ...adminLogin,
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

    "/api/v1/user/report/{exercise_id}": {
      ...sendReport,
    },
  },
};
