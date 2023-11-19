const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const UserExercise = sequelize.define("userExercise", {
  point_Achieved: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },

  performance: {
    type: Sequelize.STRING,
  },

  duration: {
    type: Sequelize.STRING,
  },

  weight_lifted: {
    type: Sequelize.DOUBLE,
  },

  calorie_conversion_result: {
    type: Sequelize.DOUBLE,
  },

  completion_status: {
    type: Sequelize.STRING,
  },
});

User.belongsToMany(Exercise, {
  through: UserExercise,
  foreignKey: "User_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Exercise.belongsToMany(User, {
  through: UserExercise,
  foreignKey: "Exercise_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = UserExercise;
