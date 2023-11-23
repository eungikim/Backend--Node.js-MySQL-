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

    exercise_part: {
      type: Sequelize.ENUM(
        "shoulders",
        "arms",
        "stomach",
        "back",
        "legs",
        "chest"
      ),
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

    usersCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Exercise;
