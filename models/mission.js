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

    name: {
      type: Sequelize.STRING,
    },

    imageURL: {
      type: Sequelize.STRING,
    },

    duration: {
      type: Sequelize.STRING,
    },

    detailed_information: {
      type: Sequelize.STRING,
    },

    detailed_guide: {
      type: Sequelize.STRING,
    },

    point: {
      type: Sequelize.DOUBLE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Mission;
