const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const UserExercise = sequelize.define(
  "userExercise",
  {
    performance: {
      type: Sequelize.ENUM("STANDARD", "ECCENTRIC", "CONCENTRIC"),
    },

    totalWeight: {
      type: Sequelize.DOUBLE,
      default: 0.0,
    },

    totalCalories: {
      type: Sequelize.DOUBLE,
      default: 0.0,
    },

    exerciseTime: {
      type: Sequelize.DOUBLE,
      default: 0.0,
    },

    isSupported: {
      type: Sequelize.DOUBLE,
      default: false,
    },

    startDate: {
      type: Sequelize.DATE,
    },

    dueDate: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
  }
);

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
