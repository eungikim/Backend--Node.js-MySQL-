const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const recordDate = sequelize.define(
  "recordDate",
  {
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
    underscored: true,
  }
);

module.exports = recordDate;
