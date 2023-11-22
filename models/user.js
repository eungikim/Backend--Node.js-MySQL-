const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    loginType: {
      type: Sequelize.ENUM(["google", "apple", "kakao"]),
    },
    socialToken: {
      type: Sequelize.STRING,
    },
    isMember: {
      type: Sequelize.BOOLEAN,
    },

    accountName: {
      type: Sequelize.STRING,
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
  },
  {
    timestamps: false,
  }
);

module.exports = User;
