const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Mission = sequelize.define(
  "mission",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: Sequelize.STRING,
    },

    subTitle: {
      type: Sequelize.STRING,
    },

    detailed_information: {
      type: Sequelize.STRING,
    },

    imageURL: {
      type: Sequelize.STRING,
    },

    point: {
      //The reward point if this mission completed
      type: Sequelize.DOUBLE,
    },

    missionTheme: {
      type: Sequelize.ENUM(
        "Attendance",
        "TotalExercise",
        "TotalWeight",
        "TotalCalories"
      ),
    },

    targetValue: {
      // The targeted mission value
      type: Sequelize.INTEGER,
    },

    usersCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    startDate: {
      type: Sequelize.DATE,
    },

    dueDate: {
      type: Sequelize.DATE,
    },

    // attendanceCheck: {
    //   type: Sequelize.INTEGER,
    // },
    // exerciseTime: {
    //   type: Sequelize.INTEGER,
    // },
    // totalWeight: {
    //   type: Sequelize.DOUBLE,
    // },
    // totalCalories: {
    //   type: Sequelize.DOUBLE,
    // },
  },
  {
    timestamps: false,
  }
);

module.exports = Mission;
