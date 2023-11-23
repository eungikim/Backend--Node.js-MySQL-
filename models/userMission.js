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

  achievedPoint: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },

  completionStatus: {
    type: Sequelize.ENUM("inProgress", "completed"),
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
