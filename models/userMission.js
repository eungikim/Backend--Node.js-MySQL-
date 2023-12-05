const Sequelize = require("sequelize");

const sequelize = require("../utils/database");
const User = require("./user");
const Mission = require("./mission");

const UserMission = sequelize.define("UserMission", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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

  // Make the following achievedValue
  achievedPoint: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },

  completionStatus: {
    type: Sequelize.ENUM("BEFORE", "ENROLL", "REWARD", "COMPLETE"),
    defaultValue: "BEFORE",
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
