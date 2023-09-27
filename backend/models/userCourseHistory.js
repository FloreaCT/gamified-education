"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserCourseHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCourseHistory.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      course_id: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      current_level: DataTypes.INTEGER,
      started_time: DataTypes.DATE,
      finished_time: DataTypes.DATE,
      completion_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "UserCourseHistory",
    }
  );
  UserCourseHistory.associate = (models) => {
    UserCourseHistory.belongsTo(models.Course, {
      foreignKey: "course_id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  };
  return UserCourseHistory;
};
