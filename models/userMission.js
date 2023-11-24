const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./user");
const Mission = require("./mission");

const UserMission = sequelize.define("UserMission", {
  title: {
    type: Sequelize.STRING,
  },

  subTitle: {
    type: Sequelize.STRING,
  },

  missionTheme: {
    type: Sequelize.STRING,
  },

  targetValue: {
    type: Sequelize.INTEGER,
  },

  point: {
    type: Sequelize.DOUBLE,
  },

  achievedPoint: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },

  completionStatus: {
    type: Sequelize.ENUM("inProgress", "completed"),
    defaultValue: "inProgress",
  },

  startDate: {
    type: Sequelize.DATE,
  },

  endDate: {
    type: Sequelize.DATE,
  },
});

User.belongsToMany(Mission, {
  through: UserMission,
  foreignKey: "UserID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Mission.belongsToMany(User, {
  through: UserMission,
  foreignKey: "MissionID",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = UserMission;
