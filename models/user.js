const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
  },
  loginType: {
    type: Sequelize.STRING,
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  point: {
    type: Sequelize.DOUBLE,
  },
  nakeName: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  height: {
    type: Sequelize.DOUBLE,
  },
  weight: {
    type: Sequelize.DOUBLE,
  },
});

module.exports = User;
