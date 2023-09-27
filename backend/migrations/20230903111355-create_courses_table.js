"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("courses", {
      course_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      course_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      course_description: {
        type: Sequelize.TEXT,
      },
      course_category: {
        type: Sequelize.STRING,
      },
      course_difficulty: {
        type: Sequelize.ENUM("Beginner", "Intermediate", "Advanced"),
      },
      total_experience: {
        type: Sequelize.INTEGER,
      },
      total_levels: {
        type: Sequelize.INTEGER,
      },
      badges: {
        type: Sequelize.TEXT,
      },
      rewards: {
        type: Sequelize.TEXT,
      },
      course_material: {
        type: Sequelize.TEXT,
      },
      quizzes: {
        type: Sequelize.TEXT,
      },
      assignments: {
        type: Sequelize.TEXT,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
