'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Roles", [
      {
        name: "Admin",
        description: "Usuarios con rol de administrador",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Regular",
        description: "Usuarios con rol estandar",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  }
};
