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

    detailed_information: {
      type: Sequelize.STRING,
      defaultValue: 0.0,
    },

    method_of_performing: {
      type: Sequelize.STRING,
    },

    pose_and_description: {
      type: Sequelize.STRING,
    },

    internal_videoURL: {
      type: Sequelize.STRING,
    },
    external_videoURL: {
      type: Sequelize.STRING,
    },
    precaution: {
      type: Sequelize.STRING,
    },
    tags: {
      type: Sequelize.TEXT,
      get() {
        const rawValue = this.getDataValue("tags");
        try {
          return JSON.parse(rawValue);
        } catch (error) {
          return rawValue;
        }
      },
      set(value) {
        this.setDataValue("tags", JSON.stringify(value));
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Exercise;
