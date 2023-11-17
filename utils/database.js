const Sequelize = require("sequelize");

const sequelize = new Sequelize("Kim2", "root", "0966463034f", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
