// "use strict";

// /** @type {import('sequelize-cli').Migration} */

// "use strict";

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "userExercise",
      "fk_userExercise_date_of_start"
    );
    await queryInterface.removeColumn("userExercise", "date_of_start");
  },

  // down: async (queryInterface, Sequelize) => {
  //   await queryInterface.addColumn("userExercise", "date_of_start", {
  //     type: Sequelize.DATE,
  //     allowNull: true,
  //   });

  //   await queryInterface.addConstraint("userExercise", {
  //     fields: ["date_of_start"],
  //     type: "foreign key",
  //     name: "fk_userExercise_date_of_start",
  //     references: {
  //       table: "recordDate", // Replace with the referenced table name
  //       field: "created_at", // Replace with the referenced column name
  //     },
  //     onDelete: "cascade",
  //     onUpdate: "cascade",
  //   });
  // },
};
