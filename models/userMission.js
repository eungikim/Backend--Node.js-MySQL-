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

  thumbnail: {
    type: Sequelize.STRING,
  },

  achieved_point: {
    type: Sequelize.DOUBLE,
    defaultValue: 0.0,
  },

  completion_status: {
    type: Sequelize.STRING,
  },

  startDate: {
    type: Sequelize.DATE,
  },

  endDate: {
    type: Sequelize.DATE,
  },

  consecutiveDaysAttended: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
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
