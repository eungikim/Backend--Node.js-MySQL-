const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  accountId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  accountName: {
    type: Sequelize.STRING,
  },
  signType: {
    type: Sequelize.ENUM(["google", "apple", "kakao"]),
  },
  imageURL: {
    type: Sequelize.STRING,
  },
  totalPoint: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },
  nickName: {
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
