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
  },
  {
    timestamps: false,
  }
);

module.exports = Admin;
