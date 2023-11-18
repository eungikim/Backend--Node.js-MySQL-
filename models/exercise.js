const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Exercise = sequelize.define(
  "exercise",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: Sequelize.STRING,
    },

    imageURL: {
      type: Sequelize.STRING,
    },

    videoURL: {
      type: Sequelize.STRING,
    },

    achievement_point: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0,
    },

    duration: {
      type: Sequelize.INTEGER,
    },

    method_of_performing: {
      type: Sequelize.STRING,
    },

    pose_and_description: {
      type: Sequelize.STRING,
    },

    precaution: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Exercise;
