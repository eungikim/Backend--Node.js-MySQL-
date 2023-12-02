const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Question = require("../models/question");

const bodyPart = require("../models/bodyPart");

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

    jwtToken: {
      type: Sequelize.STRING,
    },
    isMember: {
      type: Sequelize.BOOLEAN,
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

    lastLoginDate: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Question, {
  foreignKey: "User_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(bodyPart, {
  foreignKey: "User_ID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
module.exports = User;
