const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const PartBody = sequelize.define(
  "partBody",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    exercise_part: {
      type: Sequelize.STRING,
      type: Sequelize.ENUM(
        "shoulders",
        "arms",
        "stomach",
        "back",
        "legs",
        "chest"
      ),
    },

    weight: {
      type: Sequelize.DOUBLE,
    },

    gender: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = PartBody;
