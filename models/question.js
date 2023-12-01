// models/Question.js
const sequelize = require("../utils/database");
const Sequelize = require("sequelize");

const User = require("./user");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionText: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    answerText: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      enu: ["Answer completed", "Not answered"],
      defaultValue: "Not answered",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Question;
