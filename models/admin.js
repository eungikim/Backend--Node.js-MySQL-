const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    role: {
      type: Sequelize.STRING,
      defaultValue: "admin",
    },

    jwtToken: {
      type: Sequelize.STRING,
    },

    resetToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },

    resetTokenExpiry: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Admin;
