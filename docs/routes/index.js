const getAllUser = require("./get-users");
const getOneUser = require("./get-user");
const getAllExercises = require("./get-exercises");
const getOneExercise = require("./get-exercise");
const createNewExercise = require("./create-exercise");
const updateExercise = require("./update-exercise");

module.exports = {
  paths: {
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
    },

    "/api/v1/admin/users": {
      ...getAllUser,
    },
    "/api/v1/admin/user/{user_id}": {
      ...getOneUser,
      // ...updateTodo,
      // ...deleteTodo,
    },
  },
};
