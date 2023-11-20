const Sequelize = require("sequelize");

const sequelize = new Sequelize("motydbservice", "motyDB", "motyDBSQL", {
  dialect: "mysql",
  host: "motydbsql.cdnpznwbvfyk.us-east-1.rds.amazonaws.com",
});

module.exports = sequelize;

// const sequelize = new Sequelize("Kim2", "root", "0966463034f", {
//   dialect: "mysql",
//   host: "localhost",
// });
