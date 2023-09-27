"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.hasMany(models.UserCourseHistory, {
        foreignKey: "course_id",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  }
  Course.init(
    {
      course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_description: DataTypes.TEXT,
      course_category: DataTypes.STRING,
      course_difficulty: DataTypes.ENUM("Beginner", "Intermediate", "Advanced"),
      total_experience: DataTypes.INTEGER,
      total_levels: DataTypes.INTEGER,
      badges: DataTypes.TEXT,
      rewards: DataTypes.TEXT,
      course_material: DataTypes.TEXT,
      quizzes: DataTypes.TEXT,
      assignments: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Course",
    }
  );

  return Course;
};
