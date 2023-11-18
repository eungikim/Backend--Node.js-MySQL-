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

    Name: {
      type: Sequelize.STRING,
    },

    imageURL: {
      type: Sequelize.STRING,
    },

    videoURL: {
      type: Sequelize.STRING,
    },

    Achievement_point: {
      type: Sequelize.DOUBLE,
      defaultValue: 0.0,
    },

    Duration: {
      type: Sequelize.INTEGER,
    },

    Method_of_performing: {
      type: Sequelize.STRING,
    },

    Pose_and_description: {
      type: Sequelize.STRING,
    },

    Precaution: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Exercise;
