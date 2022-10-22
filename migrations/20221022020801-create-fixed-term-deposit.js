"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FixedTermDeposits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      accountId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      creation_date: {
        type: Sequelize.DATE,
      },
      closing_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FixedTermDeposits");
  },
};
