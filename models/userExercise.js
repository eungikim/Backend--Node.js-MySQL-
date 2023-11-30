const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("../models/user");
const Exercise = require("../models/exercise");

const UserExercise = sequelize.define(
  "userExercise",
  {
    // User_ID: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    // },
    // Exercise_ID: {
    //   type: Sequelize.INTEGER,
    //   primaryKey: true,
    // },
    // createdAt: {
    //   type: Sequelize.DATE,
    //   primaryKey: true,
    // },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    performance: {
      type: Sequelize.ENUM("STANDARD", "ECCENTRIC", "CONCENTRIC"),
    },

    totalWeight: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0,
    },

    totalCalories: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0,
    },

    exerciseTime: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0,
    },

    isSupported: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },

    startDate: {
      type: Sequelize.DATE,
    },

    dueDate: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: false,
  }
);

User.belongsToMany(Exercise, {
  through: {
    model: UserExercise,
    unique: false,
  },
  constraints: false,
  foreignKey: "User_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Exercise.belongsToMany(User, {
  through: {
    model: UserExercise,
    unique: false,
  },
  constraints: false,
  foreignKey: "Exercise_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = UserExercise;
