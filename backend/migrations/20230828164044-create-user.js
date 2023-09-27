"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      fullName: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      avatar: {
        type: Sequelize.TEXT,
      },
      experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      weeklyXP: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      monthlyXP: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      achievements: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      lastWeeklyUpdate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      lastMonthlyUpdate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      pathStarted: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      loginTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("courses");
  },
};
